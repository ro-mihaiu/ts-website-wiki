import { TRACK } from "@/content/audio";

const GROUPS = [
  { label: "Explore", links: [["Wiki home", "https://wiki-theysix.ro-mihaiu.xyz"], ["Java articles", "https://wiki-theysix.ro-mihaiu.xyz/w/java"], ["Bedrock articles", "https://wiki-theysix.ro-mihaiu.xyz/w/bedrock"], ["Discord articles", "https://wiki-theysix.ro-mihaiu.xyz/w/discord"]] },
  { label: "Community", links: [["Main", "https://theysix.ro-mihaiu.xyz"], ["Events", "https://events-theysix.ro-mihaiu.xyz"], ["About", "https://theysix.ro-mihaiu.xyz/about"], ["Socials", "https://theysix.ro-mihaiu.xyz/socials"]] },
  { label: "Legal", links: [["Terms of service", "https://wiki-theysix.ro-mihaiu.xyz/legal/terms"], ["Privacy", "https://wiki-theysix.ro-mihaiu.xyz/legal/privacy"], ["Cookies", "https://wiki-theysix.ro-mihaiu.xyz/legal/cookies"], ["Open-source licences", "https://wiki-theysix.ro-mihaiu.xyz/legal/open-source"]] },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-rule px-6 pt-16 pb-44 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="t6-display text-4xl text-ink sm:text-5xl">THEYSIX</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">Practical Java, Bedrock, and TheySix Discord guides for Minecraft players and farm builders.</p>
        </div>
        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="t6-meta">{group.label}</p>
              <ul className="mt-3">
                {group.links.map(([label, href]) => (
                  <li key={href}><a href={href} className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-portal">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-3 border-t border-rule pt-6 text-xs leading-relaxed text-ink-muted lg:grid-cols-2">
        <p>THEYSIX is not affiliated with Mojang Studios or Microsoft. Minecraft is a trademark of Mojang Studios.</p>
        <p className="lg:text-right">Soundtrack: <span className="text-ink">{TRACK.title} - {TRACK.artist}</span>. Playback begins only after you choose sound.</p>
      </div>
    </footer>
  );
}
