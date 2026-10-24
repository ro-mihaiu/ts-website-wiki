# Source manifest

## Local website

Repository: `Website/theysix-web`

Primary information sources:

- `src/content/worlds.ts` - merged public catalog and the locally shipped ATX
  entry.
- `src/content/schema.ts` - Zod-validated `WorldEntry` contract and derived
  resource availability.
- `src/content/community.ts` - social links, server rules/events, bot commands,
  and community hub routes.
- `src/content/staff.ts` - staff roster and profile information.
- `src/app/` - route inventory and page behavior.
- `public/` - local downloads, thumbnails, avatars, brand assets, audio, and
  generated schematic metadata.
- `docs/ASSET-MANIFEST.md` - provenance, licensing status, checksums, and launch
  constraints.
- `docs/QA-REPORT.md` - measured behavior and known unmeasured areas.

## Farm source repository

Repository: `https://github.com/ro-mihaiu/ts-website`

Relevant source shape:

- Farm records live under `src/data/farms/`.
- Files commonly use `<dn>-dn.tsx`, `b<dn>-dn.tsx`, `.ts`, or `.json`.
- Records contain `dn`, `title`, `farmType`, `description`, optional detailed
  description, world/schematic URLs, YouTube URL, version, rates, difficulty,
  tags, author, date, views, featured state, and optional materials.
- A filename beginning with `b` identifies Bedrock unless an explicit source
  field says otherwise.
- Placeholder values such as `link`, `#`, and the old Google Sites download
  path are not usable links.

The current importer already parses this source with the TypeScript compiler
API. Preserve that behavior and do not replace it with regex-only parsing.

## Wiki source repository

Repository: `https://github.com/ro-mihaiu/ts-wiki-website`

Observed source shape:

- Wiki articles are in `src/data/wiki/articles.ts`.
- Article editions are `java`, `bedrock`, and `discord`.
- A `WikiArticle` has `title`, `edition`, `slug`, `summary`, `tags`,
  `lastUpdated`, and typed `body` blocks.
- Body blocks include headings, paragraphs, ordered/unordered lists, rule
  lists, code, images, videos, links, callouts, and tables.
- Wiki routes use `/w/<edition>/<article-slug>` and tools use
  `/w/tools/<slug>`; `/wiki/...` is a legacy alias in the upstream site.
- Wiki farm loading also understands farm source files and optional
  `farms_builds.jsonl`, `Videos_export/Videos.txt`, `schematics.md`, and
  `worlds.md` archives.
- Farm normalization includes YouTube ID extraction, thumbnail resolution,
  material parsing, placeholder-link rejection, edition inference, compact
  rate formatting, and deterministic fallback view counts.

## Theme versus information

The new rebuild may replace the visual system, layout composition, typography,
motion, and navigation presentation. It must retain or re-import the factual
information: farm records, edition/version labels, rates, views, links, wiki
articles, community routes, legal routes, staff data, download filenames, and
asset provenance.

Do not copy visual styling from either upstream repository. Use the current
THEYSIX project as the content and behavior baseline, then create a distinct
new theme.

## Access fallback

If `ts-wiki-website` cannot be cloned because it is private:

1. Accept `WIKI_SOURCE_ROOT` as a local checked-out path.
2. Fail with a clear setup message if the path is absent when wiki import is
   requested.
3. Keep the normalized wiki adapter and sample contract in the repository.
4. Never invent article bodies, downloads, or URLs to fill the gap.