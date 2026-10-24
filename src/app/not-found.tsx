export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="t6-meta">404</p>
      <h1 className="t6-display mt-2 text-5xl text-ink sm:text-6xl">
        nothing at this address
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
        That page is not in the wiki. It may have been renamed or removed.
      </p>
      <a href="/w" className="t6-action mt-8">Return to the wiki</a>
    </div>
  );
}
