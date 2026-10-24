"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  getServerSoundChoice,
  getSoundChoice,
  setSoundChoice,
  subscribeToSoundChoice,
  type SoundChoice,
} from "@/lib/sound-choice";
import { TRACK } from "@/content/audio";

const DEFAULT_VOLUME = 0.35;
const FADE_MS = 2200;

type AudioState = {
  choice: SoundChoice;
  playing: boolean;
  volume: number;
  /** Records the visitor's entry choice and, for `sound`, starts the track. */
  enter: (choice: Exclude<SoundChoice, "unset">) => void;
  toggle: () => void;
  setVolume: (value: number) => void;
  /** Clears the remembered choice and returns the site to the entry gate. */
  reset: () => void;
};

const AudioContext = createContext<AudioState | null>(null);

export function useAudio(): AudioState {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used inside <AudioProvider>");
  return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // The remembered choice is a browser fact, read straight from its store
  // rather than copied into state by an effect.
  const choice = useSyncExternalStore(
    subscribeToSoundChoice,
    getSoundChoice,
    getServerSoundChoice,
  );

  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const elementRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const stopFade = useCallback(() => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  /** The audio element is created on the gesture, never before - the track is
   *  4.1 MB and must cost nothing to a visitor who enters muted. */
  const ensureElement = useCallback(() => {
    if (elementRef.current) return elementRef.current;
    const audio = new Audio(TRACK.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    elementRef.current = audio;
    return audio;
  }, []);

  const fadeTo = useCallback(
    (target: number) => {
      const audio = elementRef.current;
      if (!audio) return;
      stopFade();
      const from = audio.volume;
      const startedAt = performance.now();
      fadeRef.current = window.setInterval(() => {
        const progress = Math.min(1, (performance.now() - startedAt) / FADE_MS);
        audio.volume = from + (target - from) * progress;
        if (progress >= 1) {
          stopFade();
          if (target === 0) audio.pause();
        }
      }, 40);
    },
    [stopFade],
  );

  const start = useCallback(() => {
    const audio = ensureElement();
    audio.volume = 0;
    void audio
      .play()
      .then(() => fadeTo(volume))
      .catch(() => setPlaying(false));
  }, [ensureElement, fadeTo, volume]);

  const enter = useCallback(
    (next: Exclude<SoundChoice, "unset">) => {
      setSoundChoice(next);
      if (next === "sound") start();
    },
    [start],
  );

  const toggle = useCallback(() => {
    const audio = elementRef.current;
    if (!audio || audio.paused) start();
    else fadeTo(0);
  }, [fadeTo, start]);

  const setVolume = useCallback(
    (value: number) => {
      const clamped = Math.min(1, Math.max(0, value));
      setVolumeState(clamped);
      stopFade();
      if (elementRef.current) elementRef.current.volume = clamped;
    },
    [stopFade],
  );

  const reset = useCallback(() => {
    stopFade();
    elementRef.current?.pause();
    elementRef.current = null;
    setPlaying(false);
    setSoundChoice("unset");
  }, [stopFade]);

  useEffect(() => {
    const fade = fadeRef;
    const element = elementRef;
    return () => {
      if (fade.current !== null) window.clearInterval(fade.current);
      element.current?.pause();
    };
  }, []);

  const value = useMemo(
    () => ({ choice, playing, volume, enter, toggle, setVolume, reset }),
    [choice, playing, volume, enter, toggle, setVolume, reset],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
