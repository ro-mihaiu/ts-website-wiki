"use client";

import { useState } from "react";

/*
 * Unicode "small caps" glyphs - Minecraft's default font renders these
 * significantly smaller than regular capitals, which is the trick used
 * for small text in servers and motds.
 */
const smallCaps: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
  j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "q", r: "ʀ",
  s: "ꜱ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
};

function toSmallCaps(text: string): string {
  return text
    .split("")
    .map((char) => smallCaps[char.toLowerCase()] ?? char)
    .join("");
}

export function MinecraftSmallTextTool() {
  const [text, setText] = useState("TheySix");
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="mst-text" className="label-mono mb-2 block text-ink-dim">
          Text
        </label>
        <input
          id="mst-text"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>
      <div>
        <p className="label-mono mb-2 text-ink-dim">Small caps output - copy and paste anywhere</p>
        <div className="rounded-card border border-hairline bg-bg-elev p-4 text-xl tracking-wide text-brand-hi">
          {toSmallCaps(text)}
        </div>
      </div>
      <p className="text-sm text-ink-dim">
        Some glyphs (like the small q) fall back to the normal lowercase letter because
        Unicode does not provide a small-capital version.
      </p>
    </div>
  );
}
