"""
Genovix AI Backend — Stable Diffusion XL (SDXL) Image Generation
FastAPI server exposing POST /generate endpoint.
"""

import os
import uuid
import logging
import asyncio
import time
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from pipeline import load_pipeline, generate_image

# ── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
)
logger = logging.getLogger(__name__)

# ── Output directory ──────────────────────────────────────────────────────────
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="Genovix AI",
    description="Real AI image generation powered by Stable Diffusion XL",
    version="2.0.0",
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated images as static files at /outputs/<filename>
app.mount("/outputs", StaticFiles(directory=str(OUTPUT_DIR)), name="outputs")


# ── Schemas ───────────────────────────────────────────────────────────────────
class GenerateRequest(BaseModel):
    prompt: str
    negative_prompt: str = (
        "blurry, bad anatomy, watermark, text, ugly, low quality, deformed"
    )
    num_inference_steps: int = 5
    guidance_scale: float = 7.5
    width: int = 384
    height: int = 384


class GenerateResponse(BaseModel):
    status: str
    prompt: str
    image_url: str
    file_path: str


# ── Background Task: Auto Cleanup ─────────────────────────────────────────────
async def cleanup_old_images():
    """Delete images older than 1 hour to save storage."""
    while True:
        try:
            current_time = time.time()
            for filepath in OUTPUT_DIR.iterdir():
                if filepath.is_file() and filepath.suffix in ['.png', '.jpg']:
                    # 3600 seconds = 1 hour
                    if current_time - filepath.stat().st_mtime > 3600:
                        filepath.unlink()
                        logger.info(f"Auto-deleted old image: {filepath}")
        except Exception as e:
            logger.error(f"Cleanup error: {e}")
        
        # Wait for 15 minutes before checking again
        await asyncio.sleep(900)


# ── Startup ───────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    # Start the auto cleanup background task
    asyncio.create_task(cleanup_old_images())
    logger.info("Auto-cleanup background task started.")
    
    logger.info("Loading SDXL pipeline — this may take a minute on first run …")
    load_pipeline()
    logger.info("Pipeline ready ✓")


# ── Global Queue State ────────────────────────────────────────────────────────
generation_lock = asyncio.Lock()
waiting_count = 0

# ── Endpoints ─────────────────────────────────────────────────────────────────
@app.get("/", summary="Health check")
def root():
    global waiting_count
    return {
        "message": "Genovix AI API is running", 
        "version": "2.1.0",
        "queue_depth": waiting_count
    }


@app.post("/generate", response_model=GenerateResponse, summary="Generate an image")
async def generate(request: GenerateRequest):
    global waiting_count
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")

    waiting_count += 1
    logger.info(f"New request added to queue. Total waiting: {waiting_count}")

    try:
        # Global Queue Lock: Only one generation at a time
        async with generation_lock:
            logger.info(f"Processing prompt: {request.prompt!r}")
            
            import urllib.parse
            import urllib.request
            import random
            import uuid
            import time
            
            encoded_prompt = urllib.parse.quote(request.prompt)
            filename = f"{uuid.uuid4().hex}.jpg"
            file_path = OUTPUT_DIR / filename
            
            # Try Pollinations API first (Fast)
            max_retries = 2
            success = False
            
            for attempt in range(max_retries):
                seed = random.randint(1, 1000000)
                pollinations_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?seed={seed}&width={request.width}&height={request.height}&nologo=true"
                
                try:
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    }
                    req = urllib.request.Request(pollinations_url, headers=headers)
                    with urllib.request.urlopen(req, timeout=20) as response:
                        if response.status == 200:
                            with open(file_path, 'wb') as out_file:
                                out_file.write(response.read())
                            success = True
                            logger.info("Generated via API.")
                            break
                except Exception as exc:
                    logger.warning(f"API attempt {attempt + 1} failed: {exc}")
                    if attempt < max_retries - 1:
                        await asyncio.sleep(1)

            # Fallback to local model
            if not success:
                logger.info("Falling back to local model...")
                try:
                    from pipeline import generate_image
                    image = generate_image(
                        prompt=request.prompt,
                        negative_prompt=request.negative_prompt,
                        num_inference_steps=8,
                        guidance_scale=request.guidance_scale,
                        width=384,
                        height=384,
                    )
                    image.save(str(file_path))
                    success = True
                    logger.info("Generated via local fallback.")
                except Exception as local_exc:
                    logger.error(f"Local fallback failed: {local_exc}")
                    raise HTTPException(status_code=500, detail="Generation failed on all engines.")

            image_url = f"http://localhost:8000/outputs/{filename}"

            return GenerateResponse(
                status="success",
                prompt=request.prompt,
                image_url=image_url,
                file_path=str(file_path),
            )
    finally:
        waiting_count -= 1
        logger.info(f"Request completed. Remaining in queue: {waiting_count}")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
