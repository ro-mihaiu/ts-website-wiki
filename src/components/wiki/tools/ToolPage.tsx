import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/*
 * Shared shell for every /t/[slug] page: breadcrumb back to the
 * wiki home, an h1, the intro line, then the interactive tool body.
 */
export function ToolPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wiki-shell wiki-tool-page">
      <article className="max-w-[46rem] pb-16">
        <nav aria-label="Breadcrumb" className="mb-3">
          <Link
            href="/w"
            className="inline-flex items-center gap-1 text-[0.8125rem] text-ink-muted no-underline hover:text-ink hover:underline"
          >
            <ChevronLeft className="size-3.5" aria-hidden /> Back to the wiki
          </Link>
        </nav>
        <header className="mb-6 border-b border-hairline-strong pb-3">
          <h1 className="text-[1.75rem] font-bold text-ink">{title}</h1>
          <p className="wiki-prose mt-2 text-[1rem]">{description}</p>
        </header>
        {children}
      </article>
    </div>
  );
}

export function toolMetadata(title: string, description: string, canonical: string): Metadata {
  return {
    title: `${title} | TheySix Wiki`,
    description,
    alternates: { canonical },
    openGraph: { title, description },
  };
}
