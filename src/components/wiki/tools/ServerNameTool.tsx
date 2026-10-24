"use client";

import { useMemo, useState } from "react";
import { CopyButton, MINECRAFT_COLORS, MINECRAFT_FORMATS, parseMinecraftText } from "./minecraft-utils";

export function ServerNameTool() {
  const [name, setName] = useState("§bTheySix");

  const rendered = useMemo(() => {
    return parseMinecraftText(name);
  }, [name]);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="sn-name" className="label-mono mb-2 block text-ink-dim">
          Server list name
        </label>
        <input
          id="sn-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Preview - how it appears in the multiplayer list</p>
        <div className="flex min-h-14 items-center gap-3 rounded-card border border-hairline bg-black p-4 font-mono text-[17px]">
          <div className="min-w-0 flex-1">
          {rendered.map((segment, index) => (
            <span key={index} style={segment.style}>
              {segment.text}
            </span>
          ))}
          </div>
          <CopyButton value={name} />
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Color codes</p>
        <div className="flex flex-wrap gap-1.5">
          {[...MINECRAFT_COLORS.map(([code, name]) => [code, name] as const), ...Object.entries(MINECRAFT_FORMATS).map(([code, item]) => [code, item.name] as const)].map(([code, label]) => (
            <kbd key={code} className="rounded-control border border-hairline bg-bg-elev px-2 py-1 text-xs text-ink-dim">
              §{code} <span className="text-ink-muted">{label}</span>
            </kbd>
          ))}
        </div>
      </div>
    </div>
  );
}
