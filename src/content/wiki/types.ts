export type WikiEdition = "java" | "bedrock" | "discord";

export type WikiBodyBlock =
  | { type: "heading"; level: 2 | 3; text?: string; content?: string }
  | { type: "paragraph"; text?: string; content?: string }
  | { type: "list"; ordered?: boolean; items: (string | { type?: "listItem"; text?: string; content?: string })[] }
  | { type: "ruleList"; items: { title: string; text: string }[] }
  | { type: "code"; language?: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; title: string; caption?: string }
  | { type: "link"; href: string; label: string; description?: string }
  | { type: "callout"; variant: "note" | "warning" | "danger"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface WikiArticle {
  title: string;
  edition: WikiEdition;
  slug: string;
  summary: string;
  body: WikiBodyBlock[];
  tags?: string[];
  lastUpdated: string;
}

export const editionLabels: Record<WikiEdition, string> = {
  java: "Java Edition",
  bedrock: "Bedrock Edition",
  discord: "Discord",
};