import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { WikiArticle, WikiEdition } from "@/content/wiki/types";

function loadWikiArticles(): WikiArticle[] {
  const wikiRoot = path.join(process.cwd(), "public", "wiki");

  return readdirSync(wikiRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const articleFile = path.join(wikiRoot, entry.name, `article-${entry.name}.json`);

      try {
        return [JSON.parse(readFileSync(articleFile, "utf8")) as WikiArticle];
      } catch {
        return [];
      }
    })
    .sort((left, right) => left.title.localeCompare(right.title));
}

export const wikiArticles = loadWikiArticles();

export function getAllWikiArticles(): WikiArticle[] {
  return wikiArticles;
}

export function getWikiArticleByEditionAndSlug(edition: string, slug: string): WikiArticle | undefined {
  return wikiArticles.find(
    (article) => article.edition === edition && article.slug === slug,
  );
}

export function getWikiArticlesByEdition(edition: WikiEdition): WikiArticle[] {
  return wikiArticles.filter((article) => article.edition === edition);
}
