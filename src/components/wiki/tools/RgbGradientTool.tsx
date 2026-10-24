"use client";

import { useMemo, useState } from "react";

const formats = [
  { key: "none", label: "Plain section codes (§c§l)" },
  { key: "legacy-amp", label: "Ampersand codes (&c&l)" },
  { key: "json", label: "tellraw / JSON component" },
] as const;

type Format = (typeof formats)[number]["key"];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function hex(r: number, g: number, b: number) {
  return [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function RgbGradientTool() {
  const [text, setText] = useState("TheySix");
  const [start, setStart] = useState("#4CADD0");
  const [end, setEnd] = useState("#B2F9FF");
  const [format, setFormat] = useState<Format>("none");

  const gradient = useMemo(() => {
    const chars = text.split("");
    if (chars.length === 0) return [];
    const sr = parseInt(start.slice(1, 3), 16);
    const sg = parseInt(start.slice(3, 5), 16);
    const sb = parseInt(start.slice(5, 7), 16);
    const er = parseInt(end.slice(1, 3), 16);
    const eg = parseInt(end.slice(3, 5), 16);
    const eb = parseInt(end.slice(5, 7), 16);
    return chars.map((char, index) => {
      const t = chars.length === 1 ? 0 : index / (chars.length - 1);
      const color = hex(lerp(sr, er, t), lerp(sg, eg, t), lerp(sb, eb, t));
      return { char, color };
    });
  }, [text, start, end]);

  const output = useMemo(() => {
    if (gradient.length === 0) return "";
    if (format === "none") {
      return gradient.map((g) => `§x§${g.color.split("").join("§")}${g.char}`).join("");
    }
    if (format === "legacy-amp") {
      return gradient.map((g) => `&#${g.color}${g.char}`).join("");
    }
    return JSON.stringify(
      gradient.map((g) => ({ text: g.char, color: `#${g.color}` })),
    );
  }, [gradient, format]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="rg-text" className="label-mono mb-2 block text-ink-dim">Text</label>
          <input
            id="rg-text"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="rg-start" className="label-mono mb-2 block text-ink-dim">Start color</label>
          <input
            id="rg-start"
            type="color"
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-control border border-hairline bg-bg-elev p-1"
          />
        </div>
        <div>
          <label htmlFor="rg-end" className="label-mono mb-2 block text-ink-dim">End color</label>
          <input
            id="rg-end"
            type="color"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-control border border-hairline bg-bg-elev p-1"
          />
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Preview</p>
        <div className="flex min-h-14 items-center rounded-card border border-hairline bg-black p-4 text-xl">
          {gradient.map((g, index) => (
            <span key={index} style={{ color: `#${g.color}` }}>{g.char}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Output format</p>
        <div className="flex flex-wrap gap-2">
          {formats.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={format === option.key}
              onClick={() => setFormat(option.key)}
              className={`min-h-9 rounded-pill border px-3 py-1.5 text-sm transition-colors ${format === option.key
                  ? "border-brand bg-surface text-ink"
                  : "border-hairline text-ink-muted hover:bg-white/5"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <pre className="mt-3 overflow-x-auto rounded-card border border-hairline bg-bg-elev p-4 font-mono text-[13px] leading-6 text-[#A5D6FF]">
          {output || "-"}
        </pre>
      </div>
      <p className="text-sm text-ink-dim">
        The <code className="font-mono text-[85%] text-brand-hi">§x</code> RGB format works in vanilla 1.16+; the JSON
        form is what tellraw, plugins, and resource packs expect.
      </p>
    </div>
  );
}
