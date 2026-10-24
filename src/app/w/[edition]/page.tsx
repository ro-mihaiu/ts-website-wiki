import { notFound } from "next/navigation";
import Link from "next/link";
import { wikiArticles } from "@/content/wiki/articles";
import type { WikiEdition } from "@/content/wiki/types";
const editions: WikiEdition[] = ["java", "bedrock", "discord"];
const labels: Record<WikiEdition, string> = { java: "Java Edition", bedrock: "Bedrock Edition", discord: "Discord" };
export function generateStaticParams() { return editions.map((edition) => ({ edition })); }
export default async function WikiEditionPage({ params }: { params: Promise<{ edition: string }> }) { const { edition } = await params; if (!editions.includes(edition as WikiEdition)) notFound(); const typed = edition as WikiEdition; const articles = wikiArticles.filter((article) => article.edition === typed); return <div className="wiki-shell wiki-list-page"><Link href="/w" className="wiki-back">← Wiki home</Link><p className="t6-meta">EDITION INDEX</p><h1>{labels[typed]}</h1><p>{articles.length} {articles.length === 1 ? "page" : "pages"} in this category.</p><ul className="wiki-index">{articles.map((article) => <li key={article.slug}><Link href={`/w/${typed}/${article.slug}`}><strong>{article.title}</strong><span>{article.summary}</span><em>{article.tags?.join(" · ")}</em></Link></li>)}</ul></div>; }
