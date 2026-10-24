import type { MetadataRoute } from "next";
import { wikiArticles } from "@/content/wiki/articles";
import { wikiTools } from "@/content/wiki/tools";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wiki-theysix.ro-mihaiu.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/w",
    "/w/java",
    "/w/bedrock",
    "/w/discord",
    "/legal/terms",
    "/legal/privacy",
    "/legal/cookies",
    "/legal/open-source",
  ];
  const articleRoutes = wikiArticles.map((article) => `/w/${article.edition}/${article.slug}`);
  const toolRoutes = wikiTools.map((tool) => `/t/${tool.slug}`);
  return [...staticRoutes, ...articleRoutes, ...toolRoutes].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
  }));
}
