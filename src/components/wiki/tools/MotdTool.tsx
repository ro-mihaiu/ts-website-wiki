"use client";

import { useMemo, useState } from "react";

/*
 * MOTD colors are the classic §-codes. This is a trimmed, faithful subset -
 * the full set adds obfuscated/strikethrough etc., which the preview
 * approximates with CSS.
 */
export const codes: { code: string; name: string; css: string }[] = [
  { code: "0", name: "black", css: "color:#000000" },
  { code: "1", name: "dark_blue", css: "color:#0000AA" },
  { code: "2", name: "dark_green", css: "color:#00AA00" },
  { code: "3", name: "dark_aqua", css: "color:#00AAAA" },
  { code: "4", name: "dark_red", css: "color:#AA0000" },
  { code: "5", name: "dark_purple", css: "color:#AA00AA" },
  { code: "6", name: "gold", css: "color:#FFAA00" },
  { code: "7", name: "gray", css: "color:#AAAAAA" },
  { code: "8", name: "dark_gray", css: "color:#555555" },
  { code: "9", name: "blue", css: "color:#5555FF" },
  { code: "a", name: "green", css: "color:#55FF55" },
  { code: "b", name: "aqua", css: "color:#55FFFF" },
  { code: "c", name: "red", css: "color:#FF5555" },
  { code: "d", name: "light_purple", css: "color:#FF55FF" },
  { code: "e", name: "yellow", css: "color:#FFFF55" },
  { code: "f", name: "white", css: "color:#FFFFFF" },
];

const formats = [
  { code: "l", name: "bold", css: "font-weight:700" },
  { code: "o", name: "italic", css: "font-style:italic" },
  { code: "n", name: "underline", css: "text-decoration:underline" },
];

export function MotdTool() {
  const [text, setText] = useState("§bTheySix §7- §fFarm Vault");
  const [useUnicodeSection, setUseUnicodeSection] = useState(false);

  const rendered = useMemo(() => {
    // Split on § (or the alternate \u00A7 which is the same character).
    const parts = text.split("§").slice(1);
    if (text.startsWith("§") && parts.length === 0) return null;
    const segments: { style: string; text: string }[] = [];
    if (!text.startsWith("§") && text.split("§")[0]) {
      segments.push({ style: "", text: text.split("§")[0] });
    }
    for (const part of parts) {
      const code = part[0]?.toLowerCase();
      const content = part.slice(1);
      const color = codes.find((c) => c.code === code);
      const format = formats.find((f) => f.code === code);
      const prev = segments[segments.length - 1]?.style ?? "";
      if (color) segments.push({ style: color.css, text: content });
      else if (format) segments.push({ style: `${prev};${format.css}`, text: content });
      else segments.push({ style: prev, text: `§${part}` });
    }
    return segments.filter((segment) => segment.text.length > 0);
  }, [text]);

  const fileSafe = text.replace(/§/g, useUnicodeSection ? "\\u00A7" : "§");

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="motd-text" className="label-mono mb-2 block text-ink-dim">
          MOTD text (use § codes, e.g. §b for aqua)
        </label>
        <input
          id="motd-text"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Server list preview</p>
        <div className="flex min-h-16 items-center rounded-card border border-hairline bg-black p-4 font-mono text-[15px] leading-6">
          {rendered?.length ? (
            rendered.map((segment, index) => (
              <span key={index} style={segment.style ? parseStyle(segment.style) : undefined}>
                {segment.text}
              </span>
            ))
          ) : (
            <span className="text-ink-dim">Nothing to preview yet.</span>
          )}
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Paste into server.properties</p>
        <pre className="overflow-x-auto rounded-card border border-hairline bg-bg-elev p-4 font-mono text-[13px] text-[#A5D6FF]">
          motd={fileSafe}
        </pre>
        <label className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={useUnicodeSection}
            onChange={(event) => setUseUnicodeSection(event.target.checked)}
            className="size-4 accent-brand"
          />
          Use escaped {'\\u00A7'} (some server wrappers require it)
        </label>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Color codes</p>
        <div className="flex flex-wrap gap-1.5">
          {codes.map((item) => (
            <kbd key={item.code} className="rounded-control border border-hairline bg-bg-elev px-2 py-1 text-xs text-ink-dim">
              §{item.code} <span className="text-ink-muted">{item.name}</span>
            </kbd>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseStyle(style: string): React.CSSProperties {
  const result: Record<string, string> = {};
  for (const declaration of style.split(";")) {
    const [prop, value] = declaration.split(":");
    if (!prop || !value) continue;
    const key = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    result[key] = value.trim();
  }
  return result as React.CSSProperties;
}
