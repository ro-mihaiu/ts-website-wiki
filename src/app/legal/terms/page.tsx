import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern access to the TheySix Wiki, its guides, tools, links, and community documentation.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return <LegalPage eyebrow="LEGAL / TERMS" title="Terms of Service" description="The rules for using the TheySix Wiki as a practical, community-maintained Minecraft reference." updated="October 24, 2026" sections={[
    { heading: "Agreement and scope", paragraphs: ["By accessing the TheySix Wiki, you agree to use this website lawfully and responsibly. These terms apply to the wiki website, its article content, its interactive tools, and links to related TheySix properties.", "The Wiki is an informational service. It is not an official Minecraft, Mojang Studios, Microsoft, Discord, or platform-operated service."] },
    { heading: "Using the content", paragraphs: ["You may read, link to, and use the guides and tools for personal and community Minecraft projects. Individual articles, images, downloads, and linked resources may have their own copyright, trademark, or license terms. Those terms remain in effect.", "You are responsible for checking the version, edition, server rules, and safety of any build, command, conversion, or external download before using it in a world or production server."] },
    { heading: "Tools and external links", paragraphs: ["Interactive tools are provided for convenience and may contain rounding, version, or platform limitations. Check important results before relying on them.", "External links lead to websites controlled by other parties. TheySix does not control their availability, content, security, privacy practices, or terms. A link is not an endorsement or a guarantee that a file is safe or current."] },
    { heading: "Availability and changes", paragraphs: ["We may update, move, restrict, or remove pages and tools as the wiki changes. We do not promise that every article is complete, current, available at all times, or suitable for every Minecraft version.", "We may revise these terms when the website, its data practices, or its legal obligations change. The date at the top identifies the current version."] },
    { heading: "Disclaimer and limitation", paragraphs: ["The Wiki is provided on an as-is and as-available basis to the fullest extent permitted by law. TheySix makes no warranty that the content is error-free, uninterrupted, or compatible with your device, edition, server, modpack, or world.", "Nothing in these terms excludes rights or remedies that cannot lawfully be excluded. If a provision is unenforceable, the remaining provisions continue to apply."] },
    { heading: "Contact", paragraphs: ["For corrections, broken links, copyright concerns, or questions about these terms, use the official TheySix community channels linked from the main TheySix website."] },
  ]} />;
}
