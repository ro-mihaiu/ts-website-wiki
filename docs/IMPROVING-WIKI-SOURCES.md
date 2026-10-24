# Improving Wiki Sources

## Source files
- Articles: `public/wiki/<slug>/article-<slug>.json`
- Article loader: `src/content/wiki/articles.ts`
- Tools: `src/content/wiki/tools.ts`
- Types: `src/content/wiki/types.ts`

## Article structure
Articles use the `WikiArticle` shape with blocks: `paragraph`, `heading`, `list`, `code`, `image`. See `src/content/wiki/types.ts` for details.

## Images
- Store each article's source files in `public/wiki/<slug>/`.
- Name images as `image-<n>.png` in order of appearance within that article.
- Create the manifest at `public/wiki/<slug>/article-<slug>.txt` and list the image filenames in order.
- Reference an image as `{ type: "image", src: "/wiki/<slug>/image-<n>.png", ... }`.

For example, the files for `mob-spawning-mechanics` are:

```text
public/wiki/mob-spawning-mechanics/
	article-mob-spawning-mechanics.json
	article-mob-spawning-mechanics.txt
	image-1.png
```

## Tips
- Keep summaries short and descriptive
- Use proper edition tags (`java`, `bedrock`, `discord`)
- Add relevant tags for filtering
- Update `lastUpdated` when making changes
