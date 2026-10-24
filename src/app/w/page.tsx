import { wikiArticles } from "@/content/wiki/articles";
import { wikiTools } from "@/content/wiki/tools";
import { WikiSearch } from "@/components/wiki/WikiSearch";

export const metadata = { title: "Wiki", description: "Practical Java, Bedrock, and TheySix Discord guides for Minecraft players and farm builders." };

export default function WikiHomePage() {
  return <div className="wiki-shell"><header className="wiki-hero"><p className="t6-meta">THEYSIX / KNOWLEDGE ARCHIVE</p><h1>TheySix Wiki</h1><p>Clear explainers for Minecraft mechanics, Bedrock tutorials, farm support, and the TheySix Discord community.</p></header><WikiSearch articles={wikiArticles} tools={wikiTools} /></div>;
}
