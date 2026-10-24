import type { Metadata, Viewport } from "next";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { Dock } from "@/components/nav/Dock";
import { Footer } from "@/components/nav/Footer";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wiki-theysix.ro-mihaiu.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
  default: "THEYSIX Wiki - Minecraft guides and tools",
  template: "%s - THEYSIX Wiki",
  },
  description:
    "Practical Java, Bedrock, and TheySix Discord guides, references, and tools for Minecraft players and builders.",
  applicationName: "THEYSIX",
  openGraph: {
    type: "website",
    siteName: "THEYSIX",
    title: "THEYSIX Wiki - Minecraft guides and tools",
    description: "Practical Java, Bedrock, and TheySix Discord guides, references, and tools.",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#020202",
  colorScheme: "dark",
  // Browser zoom is never disabled.
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-dvh antialiased">
        <a href="#main" className="t6-skip">
          Skip to content
        </a>
        <AudioProvider>
          <div className="flex min-h-dvh flex-col">
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Dock />
        </AudioProvider>
      </body>
    </html>
  );
}
