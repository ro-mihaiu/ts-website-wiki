# THEYSIX Node.js website rebuild prompt

You are rebuilding the existing website in the currently opened project folder
as a production Node.js web application. This prompt is reusable for three
related THEYSIX websites: the main farms site, the wiki site, and the events
site. Detect the current project from the opened workspace and adapt only that
site's routes and content while preserving shared THEYSIX information. Use the
existing Next.js/React/TypeScript stack unless there is a strong, documented
reason to move away from it. The result must be a real working website, not a
visual mockup.

## Goal

Create a new, distinctive visual theme for the current site by replacing its
application presentation in the opened project folder. Preserve its information
by exporting it first into a dedicated local snapshot folder beside that
project, then make the new application read from that export. The factual
catalog, download destinations, wiki material, event information, community
information, route compatibility, metadata, accessibility, and maintenance
scripts must survive the rebuild.

Read these companion files first:

- `rebuild-kit/SOURCE-MANIFEST.md`
- `rebuild-kit/CONTENT-CONTRACT.md`
- `rebuild-kit/SCRIPT-PRESERVATION.md`
- `rebuild-kit/NAVIGATION-AND-FOOTER.md`

The navigation and footer contract is mandatory. Read it before changing the
site shell. It defines the exact seven-slot order, external destinations,
center-slot replacement behavior, footer sections, legal pages, and audio
control semantics. Do not infer a different navbar from the current site's
local route tree.

## Source priorities

1. The current local website is the behavior and asset baseline.
2. `https://github.com/ro-mihaiu/ts-website` supplies farm information and
   links through an importer.
3. `https://github.com/ro-mihaiu/ts-website-wiki` supplies wiki articles,
   wiki tools, wiki route structure, and additional farm/archive conventions.
4. If the wiki repository is private, use a local checkout supplied through
   `WIKI_SOURCE_ROOT`; do not fetch it at runtime and do not fabricate missing
   information.

The theme is the only part that should be freely redesigned. Information from
the two repositories is content, not a request to copy their layout or CSS.

## Mandatory two-phase workflow

Do these phases in order. Do not start redesigning pages before Phase 1 is
complete and validated.

### Phase 1: snapshot and freeze information

Create this folder beside the currently opened project, using the project's
parent directory and a project-specific name:

```text
<opened-project-parent>/<opened-project-name>-rebuild-content/
```

Do not hard-code `Website/theysix-web`, `theysix-web`, or any other one site's
path. For example, if the opened project is `/work/theysix-events`, the
snapshot belongs at `/work/theysix-events-rebuild-content/`. Resolve this path
from the workspace root at runtime and print it before writing files.

Populate it with a reproducible, human-readable snapshot of all current
information and the source metadata needed to rebuild the site:

- `site-content.json` - every current normalized record used by the opened site.
- `farms.json` - every normalized farm/world entry when the opened site has a
  farm catalog.
- `wiki-articles.json` and `wiki-tools.json` - wiki records when the opened
  site has wiki content.
- `events.json` - event records, dates, statuses, venues, links, and details
  when the opened site has event content.
- `community.json` - socials, server rules, bot commands, and hub links when
  present.
- `staff.json` - staff records and profile references.
- `routes.json` - current route inventory, redirects, canonical paths, and
  dynamic route parameters.
- `assets.json` - local asset paths, dimensions, checksums, provenance, and
  license notes.
- `source-manifest.json` - source repository URLs, local source paths, commit
  IDs when available, export timestamp, and record counts.
- `README.md` - snapshot format, generation command, and unresolved source or
  licensing issues.

Copy or reference local binaries only when needed by the new app; do not create
duplicate large files unnecessarily. Preserve their relative paths and record
their hashes in `assets.json`. The snapshot must include information currently
embedded in TypeScript modules, generated JSON, route files, metadata files,
and maintenance documentation. It must not include secrets, environment files,
tokens, or private credentials.

Add a deterministic export command, for example `npm run export:content`, and
make it fail on missing required sources, duplicate IDs/slugs, malformed
records, or checksum drift. Run the export and validate the resulting counts
before changing the theme. The generated snapshot is the new content source
for the rebuild; page components must not reach into upstream repositories.

### Phase 2: overwrite the application theme and UI

After Phase 1 passes, replace the current page layouts, components, CSS theme,
navigation presentation, and visual motion in the target project with the new
design. Do not merely add an alternate theme or leave the old homepage as the
default. The new routes must read normalized data from the sibling
`<opened-project-name>-rebuild-content/` snapshot (or a generated module
derived from it) and preserve all factual fields and links.

Keep the current maintenance scripts and public files where they are still
needed. Update scripts only to consume the snapshot or to add the wiki/content
export adapter. Do not delete current information to make the redesign easier.
If an old source module is no longer used at runtime, retain its exported data
through the snapshot and document the replacement path in
`<opened-project-name>-rebuild-content/README.md`.

Detect the site's role before editing:

- **Main farms site:** prioritize farm discovery, downloads, schematics,
  tutorials, Java/Bedrock filtering, and farm detail pages.
- **Wiki site:** prioritize article search, Java/Bedrock/Discord editions,
  typed article blocks, tools, table of contents, and long-form reading.
- **Events site:** prioritize event discovery, dates, statuses, venues,
  schedules, event detail pages, timezone clarity, and community links.

Do not force farms, wiki, or events routes into a site that does not own them.
Shared records may link between sites, but each site must remain focused.

## Required information architecture

### Required shared shell

All site roles retain the navigation and footer contract in
`NAVIGATION-AND-FOOTER.md`. The default navbar order is:

```text
Wiki - Events - About - Main (center) - Socials - Legal - Audio
```

The center position is a selected-category slot. At first load Main is in the
center. Selecting a category swaps it into the center and moves Main into that
category's original position. For example:

```text
initial: Wiki - Events - About - Main - Socials - Legal - Audio
Wiki:    Main - Events - About - Wiki - Socials - Legal - Audio
Socials: Wiki - Events - About - Socials - Main - Legal - Audio
```

The six category destinations are external properties except for the current
site's own route: Wiki is `https://wiki-theysix.ro-mihaiu.xyz`, Events is
`https://events-theysix.ro-mihaiu.xyz`, About is
`https://theysix.ro-mihaiu.xyz/about`, Main is
`https://theysix.ro-mihaiu.xyz`, Socials is
`https://theysix.ro-mihaiu.xyz/socials`, and Legal is the current site's legal
section. For the wiki site, Legal routes are `/legal/terms`,
`/legal/privacy`, `/legal/cookies`, and `/legal/open-source`. Audio is a
consent-respecting local control in the final slot, not a page.

The footer keeps three sections: Explore, Community, and Legal. Explore links
to the wiki home and Java, Bedrock, and Discord article indexes. Community
links to Main, Events, About, and Socials. Legal links to Terms of Service,
Privacy Policy, Cookie Notice, and Open Source Licenses. The footer remains on
articles, tools, legal pages, not-found pages, and error pages. Use the exact
external destinations and legal URLs in `NAVIGATION-AND-FOOTER.md`.

Retain these current areas, adapting their presentation to the new theme:

- Homepage and featured farm discovery.
- Searchable/filterable archive with URL-addressable GET state.
- Java, Bedrock, both-platform, and build entries.
- Farm detail pages with DN, edition, Minecraft version, rates, views,
  difficulty, tags, creator, dates, tutorials, world files, schematic files,
  materials, related entries, and honest unavailable states.
- Local file verification with exact bytes and SHA-256.
- The existing local ATX V1.4 Bedrock world and DN 517 Litematica preview.
- Wiki home, Java articles, Bedrock articles, Discord articles, article search,
  tools, table of contents, previous/next navigation, typed body rendering,
  and `/w/...` URLs.
- Community hub, socials, server, events, rules, staff, bot, tricks, upload,
  legal, status, sitemap, robots, and not-found/error routes already present.
- Legacy redirects currently supported by the project, including legal aliases
  and any `/wiki` to `/w` compatibility required by the merged information
  architecture.

## Data implementation

Create a normalized content layer matching `CONTENT-CONTRACT.md`. Pages must
consume normalized records only.

Keep `import-ts-website.mjs` nearly unchanged. It already uses the TypeScript
compiler API to read farm objects and must continue to reject placeholder URLs,
extract YouTube IDs, preserve explicit fields, and write deterministic catalog
JSON.

Add a small wiki importer or adapter that:

- Reads `src/data/wiki/articles.ts` from a local source root.
- Reads wiki tools from their existing source module.
- Converts all supported article body blocks without dropping fields.
- Preserves Java, Bedrock, and Discord editions.
- Preserves article slugs, dates, tags, summaries, links, image paths, video
  URLs, code, callouts, and tables.
- Records source commit metadata outside the public runtime record if useful.
- Supports the upstream farm/archive conventions without creating duplicate farm
  entries when the catalog importer already imported the same DN.

Validate normalized records with Zod or an equivalent strict runtime schema.
Reject duplicate `(edition, slug)` pairs, malformed YouTube IDs, invalid dates,
non-HTTPS external URLs where HTTPS is expected, and local download metadata
whose byte/hash values do not match disk.

## New theme direction

Design an intentional visual system rather than a generic dashboard or a copy
of the current dark signal-field theme. Pick a clear direction suitable for a
technical Minecraft archive and document it in the code:

- Use expressive typography with a deliberate display/body pairing.
- Define CSS variables for surfaces, text, rules, focus, action, and edition
  accents.
- Use a restrained palette with distinct Java, Bedrock, build, and wiki cues.
- Use atmospheric texture, pattern, or restrained gradients where useful, but
  keep text and controls readable.
- Use a few meaningful page-load or section-reveal transitions, with a complete
  reduced-motion path.
- Keep cards for repeated archive items and genuinely framed tools only.
- Use Lucide icons for controls and familiar symbols for compact actions.
- Preserve stable dimensions for controls, cards, media, grids, and viewer
  surfaces so content cannot shift the layout.
- Keep primary actions obvious, keyboard reachable, and at least 44px tall.
- Use real local assets where the current site provides them. Do not add
  external stock-image dependencies or invented brand artwork.

The home page should communicate THEYSIX and the archive immediately. The
library should optimize scanning and comparison. Wiki pages should optimize
long-form reading with an article rail or table of contents on wide screens and
a compact, accessible navigation treatment on mobile.

## Technical constraints

- Keep server rendering and static generation where they are currently used.
- Keep JavaScript optional for archive navigation, forms, and readable article
  content. Client components are appropriate for audio, WebGL, preview controls,
  and interactive search enhancements.
- Keep the homepage 3D scene additive with static/reduced-motion fallbacks.
- Keep the schematic viewer isolated, client-only, cancellable, and limited to
  verified matching local files.
- Use `youtube-nocookie.com` click-to-load behavior already established by the
  site.
- Never render a download action for a missing local file.
- Never show a verified badge for an external-only resource.
- Keep image alt text, heading structure, focus styles, skip navigation, labels,
  landmarks, and contrast at the current quality level.
- Keep metadata, canonical URLs, sitemap entries, Open Graph data, and robots
  behavior accurate for the merged route tree.

## Script compatibility

Preserve the command names and script behavior documented in
`SCRIPT-PRESERVATION.md`. New scripts must be additive and deterministic. The
production build should fail when generated content or local assets violate
their contracts.

## Verification before completion

Run, in this order:

```text
npm run import:catalog -- /path/to/ts-website
npm run import:wiki -- /path/to/ts-wiki-website
npm run verify
npm run typecheck
npm run lint
npm run build
```

Then run the browser UI verification against the production server. Check at
least `/`, `/library`, one Java farm, `/farm/bedrock/atx-v1-4`, `/w`, one Java
wiki article, one Bedrock wiki article, one Discord wiki article, `/socials`,
and the legal pages at 375px, 768px, 1024px, and 1440px widths.

The final report must state which upstream repositories were accessible, the
number of imported farm and wiki records, generated route count, verification
commands run, and any source or licensing items that remain unresolved.