"use client";

import { useMemo, useState } from "react";

const formats = [
  { key: "t", label: "Short time", example: "10:42 AM" },
  { key: "T", label: "Long time", example: "10:42:30 AM" },
  { key: "d", label: "Short date", example: "01/02/2026" },
  { key: "D", label: "Long date", example: "January 2, 2026" },
  { key: "f", label: "Short datetime", example: "January 2, 2026 10:42 AM" },
  { key: "F", label: "Long datetime", example: "Friday, January 2, 2026 10:42 AM" },
  { key: "R", label: "Relative", example: "in 3 hours / 2 months ago" },
] as const;

export function DiscordTimestampsTool() {
  const [localValue, setLocalValue] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  });

  const unix = useMemo(() => {
    const date = new Date(localValue);
    return Number.isNaN(date.getTime()) ? null : Math.floor(date.getTime() / 1000);
  }, [localValue]);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="dt-input" className="label-mono mb-2 block text-ink-dim">
          Date and time (your local timezone)
        </label>
        <input
          id="dt-input"
          type="datetime-local"
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          className="w-full max-w-sm rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <div className="overflow-hidden rounded-card border border-hairline">
        <table className="w-full text-left text-[14.5px]">
          <thead>
            <tr className="bg-bg-elev">
              <th scope="col" className="label-mono border-b border-hairline px-4 py-2.5 text-ink-muted">Syntax</th>
              <th scope="col" className="label-mono border-b border-hairline px-4 py-2.5 text-ink-muted">Renders as</th>
            </tr>
          </thead>
          <tbody>
            {formats.map((format, index) => (
              <tr key={format.key} className={index % 2 === 0 ? "bg-white/[0.02]" : ""}>
                <td className="border-b border-hairline px-4 py-2.5 font-mono text-[85%] text-brand-hi last:border-b-0">
                  {unix !== null ? `<t:${unix}:${format.key}>` : "-"}
                </td>
                <td className="border-b border-hairline px-4 py-2.5 text-ink-muted last:border-b-0">
                  {format.label} <span className="text-ink-dim">· e.g. {format.example}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-ink-dim">
        Paste any syntax into Discord - every member sees it converted to their own timezone.
      </p>
    </div>
  );
}
