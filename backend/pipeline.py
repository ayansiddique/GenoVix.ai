"""
pipeline.py — SDXL model loader & image generator.

Responsible for:
  - Detecting GPU / CPU
  - Loading the SDXL model with float16 on GPU (or float32 on CPU)
  - Exposing a single `generate_image()` function
"""

import logging
import torch
from diffusers import StableDiffusionXLPipeline
from PIL import Image

logger = logging.getLogger(__name__)

# ── Global pipeline singleton ─────────────────────────────────────────────────
_pipe = None

# Stable Diffusion v1.5 — Fully open and legally safe for commercial launch
MODEL_ID = "stable-diffusion-v1-5/stable-diffusion-v1-5"


def _get_device() -> tuple[str, torch.dtype]:
    """Return the best available device."""
    if torch.cuda.is_available():
        return "cuda", torch.float16
    return "cpu", torch.float32


def load_pipeline() -> None:
    """Load and cache the SD 1.5 pipeline."""
    global _pipe
    if _pipe is not None:
        return

    device, dtype = _get_device()
    logger.info(f"Loading {MODEL_ID} on {device} …")

    from diffusers import StableDiffusionPipeline
    
    _pipe = StableDiffusionPipeline.from_pretrained(
        MODEL_ID,
        torch_dtype=dtype,
    )
    _pipe = _pipe.to(device)

    logger.info("Stable Diffusion 1.5 pipeline loaded successfully.")


def generate_image(
    prompt: str,
    negative_prompt: str = "ugly, blurry, low quality",
    num_inference_steps: int = 25,
    guidance_scale: float = 7.5,
    width: int = 512,
    height: int = 512,
) -> Image.Image:
    """
    Run inference using SD 1.5.
    """
    if _pipe is None:
        raise RuntimeError("Pipeline not loaded.")

    result = _pipe(
        prompt=prompt,
        negative_prompt=negative_prompt,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
        width=width,
        height=height,
    )

    return result.images[0]
