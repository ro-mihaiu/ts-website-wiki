# Contributing to the Wiki

This wiki uses a structured content model. Articles are defined in `src/content/wiki/articles.ts`.

## Adding a new article
1. Add entry to `wikiArticles` array in `src/content/wiki/articles.ts`
2. Follow existing `WikiArticle` shape from `src/content/wiki/types.ts`
3. Use appropriate `edition` (`java` | `bedrock` | `discord`)
4. Add images to `public/wiki/` following the image declaration system (see below)

## Image declaration system
Images are declared per-article as `image-<number>.png` in `public/wiki/`. For each article, create a manifest file:
- `public/wiki/article-<slug>.txt` (or `article-<slug>.json`) listing images in order of appearance

See `docs/WIKI-IMAGE-MANIFESTS.md` for details.
