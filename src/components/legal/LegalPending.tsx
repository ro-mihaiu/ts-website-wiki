/**
 * Legal copy is never invented. These routes exist so the footer links
 * resolve, and they state exactly what the site does technically - which is
 * verifiable from the source - while making clear that the approved policy
 * text is still outstanding.
 */
export function LegalPending({
  title,
  kind,
  note,
}: {
  title: string;
  kind: string;
  note: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <p className="t6-meta">Legal</p>
      <h1 className="t6-display mt-2 text-5xl text-ink sm:text-6xl">{title}</h1>

      <div className="t6-panel mt-8 p-6">
        <h2 className="text-lg font-bold text-ink">{kind} not yet published</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{note}</p>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">
          What this site stores in your browser
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          This is a factual description of the code as built, not a policy.
        </p>
        <dl className="mt-4">
          <div className="border-t border-rule py-3">
            <dt className="t6-meta">theysix:sound-choice - local storage</dt>
            <dd className="mt-1 text-sm text-ink-muted">
              Records whether you chose to enter with sound or muted, so the
              entry gate does not ask again on every visit. Written only when
              you click one of those two buttons. Clear it at any time with{" "}
              <span className="text-ink">Change</span> on the audio player.
            </dd>
          </div>
          <div className="border-t border-rule py-3">
            <dt className="t6-meta">theysix:entered - session storage</dt>
            <dd className="mt-1 text-sm text-ink-muted">
              A single flag set while moving from the opening into the page, used
              to place keyboard focus on the library heading. It is removed as
              soon as it is read, and is gone when you close the tab.
            </dd>
          </div>
          <div className="border-t border-rule py-3">
            <dt className="t6-meta">No analytics, no advertising cookies</dt>
            <dd className="mt-1 text-sm text-ink-muted">
              No tracking script, analytics service, or third-party cookie is
              loaded by this build.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-ink">Trademarks</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          theysix is not affiliated with Mojang Studios or Microsoft. Minecraft
          is a trademark of Mojang Studios. This site is not approved by or
          associated with Mojang or Microsoft.
        </p>
      </section>
    </div>
  );
}
