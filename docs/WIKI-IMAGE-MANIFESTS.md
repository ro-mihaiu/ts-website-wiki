# Wiki Image Manifests

Each article declares its images in a manifest file stored under `public/wiki/`.

## File naming
- Text format: `public/wiki/article-<slug>.txt` (one image filename per line)
- JSON format: `public/wiki/article-<slug>.json` (structured metadata)

## Image naming
Images are named `image-<number>.png` in order of appearance within each article's manifest.

## Example
For article `mob-spawning-mechanics`, create `public/wiki/article-mob-spawning-mechanics.txt`:
```
image-1.png
image-2.png
image-3.png
```

The manifest tracks which images belong to which article for easier maintenance and for contributors improving wiki sources.
