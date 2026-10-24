"use client";

import { useState } from "react";

export type MinecraftSegment = { style: React.CSSProperties; text: string };

export const MINECRAFT_FORMATS = {
  l: { name: "bold", style: { fontWeight: 700 } },
  o: { name: "italic", style: { fontStyle: "italic" } },
  n: { name: "underline", style: { textDecoration: "underline" } },
} as const;

export const MINECRAFT_COLORS = [
  ["0", "black", "#000000"], ["1", "dark_blue", "#0000AA"],
  ["2", "dark_green", "#00AA00"], ["3", "dark_aqua", "#00AAAA"],
  ["4", "dark_red", "#AA0000"], ["5", "dark_purple", "#AA00AA"],
  ["6", "gold", "#FFAA00"], ["7", "gray", "#AAAAAA"],
  ["8", "dark_gray", "#555555"], ["9", "blue", "#5555FF"],
  ["a", "green", "#55FF55"], ["b", "aqua", "#55FFFF"],
  ["c", "red", "#FF5555"], ["d", "light_purple", "#FF55FF"],
  ["e", "yellow", "#FFFF55"], ["f", "white", "#FFFFFF"],
] as const;

const colorByCode = new Map<string, { name: string; color: string }>(
  MINECRAFT_COLORS.map(([code, name, color]) => [code, { name, color }]),
);

export function parseMinecraftText(text: string): MinecraftSegment[] {
  const segments: MinecraftSegment[] = [];
  let style: React.CSSProperties = {};
  let buffer = "";

  const flush = () => {
    if (buffer) segments.push({ style, text: buffer });
    buffer = "";
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char !== "§" || index + 1 >= text.length) {
      buffer += char;
      continue;
    }

    const code = text[index + 1].toLowerCase();
    const color = colorByCode.get(code);
    const format = MINECRAFT_FORMATS[code as keyof typeof MINECRAFT_FORMATS];
    if (!color && !format) {
      buffer += `§${text[index + 1]}`;
      index += 1;
      continue;
    }

    flush();
    if (color) style = { color: color.color };
    else style = { ...style, ...format.style };
    index += 1;
  }

  flush();
  return segments;
}

export function useCopyText() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const { copied, copy } = useCopyText();
  return (
    <button
      type="button"
      onClick={() => void copy(value)}
      className="label-mono min-h-8 border border-hairline px-2.5 text-ink-dim transition-colors hover:bg-surface-hover hover:text-ink"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
