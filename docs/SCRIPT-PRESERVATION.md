# Script preservation map

Keep the current maintenance workflow and command names wherever possible.

Add one first-phase command before the visual rebuild:

| New command/script | Requirement |
|---|---|
| `npm run export:content` | Snapshot all current normalized information into the sibling folder `<opened-project-name>-rebuild-content/`, validate counts/IDs/checksums, and record source metadata before any UI overwrite. |

The implementation phase must consume the sibling snapshot folder rather than reading
the old page components as its runtime content source.

| Existing command/script | Rebuild requirement |
|---|---|
| `npm run dev` | Keep the local development command. |
| `npm run build` | Run content generation and asset verification before build. |
| `npm run start` | Keep production start behavior. |
| `npm run lint` | Keep ESLint and make the new normalized adapters lint-clean. |
| `npm run typecheck` | Keep strict TypeScript validation. |
| `npm run verify` | Keep preview generation and asset verification. |
| `npm run generate:previews` | Keep schematic parsing/manifest generation. |
| `npm run import:catalog` | Keep the first positional argument as the local `ts-website` path. |
| `scripts/import-ts-website.mjs` | Preserve TypeScript AST parsing, placeholder rejection, YouTube extraction, date validation, and source commit metadata. |
| `scripts/generate-litematic-preview.mjs` | Preserve byte/hash checks and parsed dimensions/material facts. |
| `scripts/verify-assets.mjs` | Preserve exact local asset verification. |
| `scripts/patch-schematic-renderer.mjs` | Keep the postinstall compatibility patch if the same renderer is used. |
| `scripts/verify-ui.mjs` | Extend the route list for wiki pages without weakening overflow, target-size, naming, alt-text, or heading checks. |

Add, if needed:

- `scripts/import-ts-wiki.mjs` for the wiki adapter.
- `scripts/validate-content.mjs` for cross-source duplicate/slugs/link checks.
- `src/content/wiki.generated.json` for generated wiki records.

The wiki importer should accept `WIKI_SOURCE_ROOT` or a second explicit CLI
argument, record the source commit when available, and emit deterministic JSON.
It must not make the website runtime depend on a private GitHub connection.

Suggested compatibility commands:

```text
npm run import:catalog -- /path/to/ts-website
npm run import:wiki -- /path/to/ts-wiki-website
npm run verify
npm run typecheck
npm run lint
npm run build
```