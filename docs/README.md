# THEYSIX rebuild kit

This folder is the reusable handoff package for rebuilding three related
THEYSIX Node.js websites: the main farms site, the wiki site, and the events
site. It changes each site's visual theme while preserving its information.

Start with `REBUILD-PROMPT.md`. It is intentionally written as an
implementation brief that can be given to a coding agent. The other files are
the contracts and source notes that the agent must keep nearby while working.

## Included files

- `REBUILD-PROMPT.md` - complete implementation brief and acceptance criteria.
- `SOURCE-MANIFEST.md` - local and upstream information sources, provenance,
  and private-repository fallback rules.
- `CONTENT-CONTRACT.md` - normalized farm and wiki record shapes.
- `SCRIPT-PRESERVATION.md` - existing maintenance scripts and the compatibility
  rules for keeping them almost unchanged.
- `NAVIGATION-AND-FOOTER.md` - required navbar order, center-slot replacement
  behavior, external site destinations, footer sections, and legal links.

## Intended use

This is a rebuild specification for replacing the current opened site's
application theme and UI. The implementation must first snapshot the current
information into a project-specific sibling folder such as
`<project-name>-rebuild-content/`, validate that snapshot, and then use it as
the content source while overwriting the current app presentation. Maintenance
scripts should remain compatible and be changed only where an adapter is
required.

The corrected wiki source is `https://github.com/ro-mihaiu/ts-wiki-website`.
It may require GitHub access to clone. The prompt defines a local-path mode so
the rebuild remains reproducible when that repository is private.