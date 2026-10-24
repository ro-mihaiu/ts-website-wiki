# Normalized content contract

The rebuild should use one normalized content layer. Pages must not parse
upstream TypeScript, JSONL, or markdown archives directly.

## Farm entry

```ts
type Edition = "java" | "bedrock" | "both" | "build";
type Difficulty = "easy" | "medium" | "hard" | "expert";

interface FarmEntry {
  id: string;
  slug: string;
  dn?: string;
  title: string;
  edition: Edition;
  minecraftVersion: string;
  category: string;
  difficulty?: Difficulty;
  expectedRate?: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  thumbnail: { src: string; alt: string; width: number; height: number };
  worldFile?: DownloadRef;
  schematicFile?: DownloadRef;
  externalWorldUrl?: string;
  externalSchematicUrl?: string;
  tutorialUrl?: string;
  youtubeId?: string;
  creator?: string;
  updatedAt?: string;
  featured: boolean;
  verified: boolean;
  supportsBothPlatforms: boolean;
  views?: number;
  materials?: Material[];
  license?: { holder: string; terms: string; url?: string };
  worldSettings?: { label: string; value: string }[];
}

interface DownloadRef {
  src: string;
  filename: string;
  bytes: number;
  mime: string;
  sha256: string;
}

interface Material {
  name: string;
  count: number;
  stacks?: string;
  icon?: string;
}
```

Rules:

- Omit facts that have no source. Do not use plausible defaults for rates,
  materials, views, difficulty, or credits.
- Derive local availability from files on disk. A missing file must never render
  a working download action.
- External resources remain visibly external and are not presented as locally
  checksum-verified.
- Verify every shipped binary by exact byte count and lowercase SHA-256.
- A schematic preview is valid only when its metadata matches its local source
  file. Never show one farm's preview on another farm's page.

## Wiki article

```ts
type WikiEdition = "java" | "bedrock" | "discord";

interface WikiArticle {
  title: string;
  edition: WikiEdition;
  slug: string;
  summary: string;
  tags: string[];
  lastUpdated: string;
  body: WikiBodyBlock[];
}

type WikiBodyBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "ruleList"; items: { title: string; text: string }[] }
  | { type: "code"; language?: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; title: string; caption?: string }
  | { type: "link"; href: string; label: string; description?: string }
  | { type: "callout"; variant: "note" | "warning" | "danger"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };
```

The renderer must map every block type to accessible HTML and preserve links,
captions, code text, table headers, and heading anchors.