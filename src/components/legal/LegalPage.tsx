import Link from "next/link";

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: Section[];
};

const legalLinks = [
  ["Terms of Service", "/legal/terms"],
  ["Privacy Policy", "/legal/privacy"],
  ["Cookie Notice", "/legal/cookies"],
  ["Open Source Licenses", "/legal/open-source"],
] as const;

export function LegalPage({ eyebrow, title, description, updated, sections }: LegalPageProps) {
  return (
    <article className="wiki-shell wiki-legal-page">
      <header className="wiki-legal-header">
        <p className="t6-meta">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="wiki-meta">Last updated {updated}</p>
      </header>

      <div className="wiki-legal-layout">
        <nav aria-label="Legal documents" className="wiki-legal-nav">
          <p className="t6-meta">Legal documents</p>
          <ul>
            {legalLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="wiki-prose wiki-legal-copy">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
