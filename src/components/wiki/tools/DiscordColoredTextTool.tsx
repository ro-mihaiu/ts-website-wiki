"use client";

import { useState } from "react";

const ANSI = {
  reset: "\u001B[0m",
  bold: "\u001B[1m",
  red: "\u001B[31m",
  yellow: "\u001B[33m",
  green: "\u001B[32m",
  cyan: "\u001B[36m",
  blue: "\u001B[34m",
  magenta: "\u001B[35m",
  white: "\u001B[37m",
  gray: "\u001B[90m",
} as const;

const palettes = [
  { name: "Red", fg: ANSI.red, bg: "41", swatch: "text-[#ED4245]" },
  { name: "Yellow", fg: ANSI.yellow, bg: "43", swatch: "text-[#FEE75C]" },
  { name: "Green", fg: ANSI.green, bg: "42", swatch: "text-[#57F287]" },
  { name: "Cyan", fg: ANSI.cyan, bg: "46", swatch: "text-[#39D0D8]" },
  { name: "Blue", fg: ANSI.blue, bg: "44", swatch: "text-[#5865F2]" },
  { name: "Magenta", fg: ANSI.magenta, bg: "45", swatch: "text-[#EB459E]" },
  { name: "White", fg: ANSI.white, bg: "47", swatch: "text-white" },
  { name: "Gray", fg: ANSI.gray, bg: "100", swatch: "text-[#B5BAC1]" },
] as const;

export function DiscordColoredTextTool() {
  const [text, setText] = useState("Farms are up and running!");
  const [color, setColor] = useState<(typeof palettes)[number]>(palettes[0]);
  const [bold, setBold] = useState(false);

  const prefix = `${ANSI.reset}${bold ? ANSI.bold : ""}${color.fg}`;
  const output = `\`\`\`ansi\n${prefix}${text}${ANSI.reset}\n\`\`\``;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="dct-text" className="label-mono mb-2 block text-ink-dim">
          Text
        </label>
        <input
          id="dct-text"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <fieldset>
        <legend className="label-mono mb-2 text-ink-dim">Color</legend>
        <div className="flex flex-wrap gap-2">
          {palettes.map((palette) => (
            <button
              key={palette.name}
              type="button"
              aria-pressed={color.name === palette.name}
              onClick={() => setColor(palette)}
              className={`flex min-h-9 items-center gap-2 rounded-pill border px-3 py-1.5 text-sm transition-colors ${color.name === palette.name
                  ? "border-brand bg-surface text-ink"
                  : "border-hairline text-ink-muted hover:bg-white/5"
                }`}
            >
              <span className={`size-3 rounded-full bg-current ${palette.swatch}`} aria-hidden />
              {palette.name}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex min-h-9 items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={bold}
          onChange={(event) => setBold(event.target.checked)}
          className="size-4 accent-brand"
        />
        Bold
      </label>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Paste this into Discord</p>
        <pre className="overflow-x-auto rounded-card border border-hairline bg-bg-elev p-4 font-mono text-[13px] leading-6 text-[#A5D6FF]">
          {output}
        </pre>
      </div>
      <p className="text-sm text-ink-dim">
        The three backticks and the <code className="font-mono text-[85%] text-brand-hi">ansi</code> tag are required -
        that is what tells Discord to interpret the escape codes.
      </p>
    </div>
  );
}
