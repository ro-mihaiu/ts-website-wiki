"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 sm:px-8">
      <p className="t6-meta">Error</p>
      <h1 className="t6-display mt-2 text-5xl text-ink sm:text-6xl">
        that page failed to load
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
        Something broke while building this view. Try again. If it keeps
        failing, the wiki index below is still available.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="t6-action">
          Try again
        </button>
        <a href="/w" className="t6-action-quiet">
          Go to the wiki
        </a>
      </div>
      {error.digest ? (
        <p className="mt-6 font-mono text-xs text-ink-muted">
          Reference: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
