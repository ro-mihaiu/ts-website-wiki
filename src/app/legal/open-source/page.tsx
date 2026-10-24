import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Open Source Licenses",
  description: "Third-party software, open source acknowledgements, and licensing information for the TheySix Wiki.",
  alternates: { canonical: "/legal/open-source" },
};

export default function OpenSourcePage() {
  return <LegalPage eyebrow="LEGAL / OPEN SOURCE" title="Open Source Licenses" description="The software foundations and third-party packages that help the TheySix Wiki run." updated="October 24, 2026" sections={[
    { heading: "Why this page exists", paragraphs: ["The TheySix Wiki is built with open source software. This page identifies the principal application frameworks and libraries used by the website. Each package remains governed by its own license and copyright notices.", "The complete dependency metadata and lockfile are shipped with the project source. Where a package includes a separate license or notice file, that file is the authoritative text."] },
    { heading: "Core application", bullets: ["Next.js and React, used for server-rendered pages, routing, and the user interface.", "TypeScript, used for typed application code and content contracts.", "Tailwind CSS and PostCSS tooling, used for the site's CSS build pipeline.", "Lucide React, used for interface icons.", "Zod, used for runtime content validation where applicable."] },
    { heading: "Interactive and media packages", bullets: ["React Three Fiber and Three.js, retained in the project for the shared THEYSIX visual system and optional scene components.", "GSAP and related rendering utilities, used by retained motion and scene code where enabled.", "Schematic renderer packages and their supporting dependencies, retained only where the project source requires them."] },
    { heading: "Content and trademarks", paragraphs: ["THEYSIX branding, original article text, screenshots, and community materials are not automatically covered by the licenses of the software packages listed above. Do not assume that an open source dependency license grants permission to reuse TheySix content or third-party media.", "Minecraft is a trademark of Mojang Studios. Discord, YouTube, GitHub, and other names belong to their respective owners. The TheySix Wiki is an independent community resource."] },
    { heading: "License questions", paragraphs: ["If you believe a required attribution or license notice is missing, report the package name and the relevant page or build to the TheySix project maintainers through the official community channels. Include enough detail to reproduce the concern."] },
  ]} />;
}
