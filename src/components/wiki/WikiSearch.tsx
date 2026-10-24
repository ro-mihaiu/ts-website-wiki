"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { WikiArticle, WikiBodyBlock } from "@/content/wiki/types";
import type { WikiTool } from "@/content/wiki/tools";

function flatten(blocks: WikiBodyBlock[]) {
  return blocks.map((block) => {
    if (block.type === "heading" || block.type === "paragraph" || block.type === "code" || block.type === "callout") return block.type === "code" ? block.code : block.text;
    if (block.type === "list") return block.items.join(" ");
    if (block.type === "ruleList") return block.items.map((item) => `${item.title} ${item.text}`).join(" ");
    if (block.type === "link") return `${block.label} ${block.description ?? ""}`;
    if (block.type === "image") return `${block.alt} ${block.caption ?? ""}`;
    if (block.type === "video") return `${block.title} ${block.caption ?? ""}`;
    return block.rows.flat().concat(block.head).join(" ");
  }).join(" ");
}

function normalize(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function WikiSearch({ articles, tools }: { articles: WikiArticle[]; tools: WikiTool[] }) {
  const [query, setQuery] = useState("");
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const matches = (value: string) => terms.length === 0 || terms.every((term) => normalize(value).includes(term));
  const filteredArticles = useMemo(() => articles.filter((article) => matches(`${article.title} ${article.summary} ${(article.tags ?? []).join(" ")} ${flatten(article.body)}`)), [articles, query]);
  const filteredTools = useMemo(() => tools.filter((tool) => matches(`${tool.title} ${tool.description}`)), [tools, query]);
  const hasQuery = terms.length > 0;

  return <>
    <form className="wiki-search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="wiki-q">Search the wiki</label>
      <input id="wiki-q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try spawning, portals, or Discord" />
      <button type="button" onClick={() => setQuery("")}>{hasQuery ? "Clear" : "Search"}</button>
    </form>
    <p className="wiki-search-status" aria-live="polite">{hasQuery ? `${filteredArticles.length + filteredTools.length} matching pages` : `Search ${articles.length} articles and ${tools.length} tools.`}</p>
    <section className="wiki-section"><div className="wiki-section-heading"><span>TOOLS</span><h2>{hasQuery ? "Matching tools" : "Useful builders and calculators"}</h2></div>{filteredTools.length > 0 ? <ul className="wiki-index">{filteredTools.map((tool) => <li key={tool.slug}><Link href={`/t/${tool.slug}`}><strong>{tool.title}</strong><span>{tool.description}</span></Link></li>)}</ul> : <p className="wiki-empty">No tools match those keywords.</p>}</section>
    <section id="article-index" className="wiki-section"><div className="wiki-section-heading"><span>ARTICLE INDEX</span><h2>{hasQuery ? "Matching articles" : "Browse by edition"}</h2></div>{["java", "bedrock", "discord"].map((edition) => { const list = filteredArticles.filter((article) => article.edition === edition); if (hasQuery && list.length === 0) return null; return <div className="wiki-edition" key={edition}><h3>{edition === "java" ? "Java Edition" : edition === "bedrock" ? "Bedrock Edition" : "Discord"}</h3><ul className="wiki-index">{list.map((article) => <li key={article.slug}><Link href={`/w/${edition}/${article.slug}`}><strong>{article.title}</strong><span>{article.summary}</span><em>{article.tags?.join(" · ")}</em></Link></li>)}</ul></div>; })}{hasQuery && filteredArticles.length === 0 ? <p className="wiki-empty">No articles match those keywords.</p> : null}</section>
  </>;
}
