/**
 * The remembered entry choice as an external store.
 *
 * The value lives in localStorage, which is outside React, so it is read via
 * `useSyncExternalStore` instead of being pulled into state from an effect.
 * The server snapshot is always "unset", so the entry gate renders on the
 * server and the remembered choice is applied after hydration.
 */

export type SoundChoice = "unset" | "sound" | "muted";

const STORAGE_KEY = "theysix:sound-choice";

let snapshot: SoundChoice | null = null;
const listeners = new Set<() => void>();

function read(): SoundChoice {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "sound" || stored === "muted" ? stored : "unset";
  } catch {
    // Storage blocked - the gate simply asks again.
    return "unset";
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export function getSoundChoice(): SoundChoice {
  snapshot ??= read();
  return snapshot;
}

export function getServerSoundChoice(): SoundChoice {
  return "unset";
}

export function subscribeToSoundChoice(onChange: () => void): () => void {
  listeners.add(onChange);
  // Another tab changing the choice keeps this one in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = read();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setSoundChoice(choice: SoundChoice) {
  try {
    if (choice === "unset") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Non-fatal: the choice still applies for this page view.
  }
  snapshot = choice;
  emit();
}
