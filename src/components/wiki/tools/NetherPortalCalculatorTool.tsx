"use client";

import { useState } from "react";

type Direction = "overworld-to-nether" | "nether-to-overworld";

export function NetherPortalCalculatorTool() {
  const [direction, setDirection] = useState<Direction>("overworld-to-nether");
  const [x, setX] = useState("1000");
  const [y, setY] = useState("64");
  const [z, setZ] = useState("-500");

  const nX = Number(x);
  const nY = Number(y);
  const nZ = Number(z);
  const valid = [nX, nY, nZ].every((n) => Number.isFinite(n));

  const result = valid
    ? direction === "overworld-to-nether"
      ? { x: Math.floor(nX / 8), y: nY, z: Math.floor(nZ / 8) }
      : { x: nX * 8, y: nY, z: nZ * 8 }
    : null;

  const from = direction === "overworld-to-nether" ? "Overworld" : "Nether";
  const to = direction === "overworld-to-nether" ? "Nether" : "Overworld";

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Conversion direction" className="inline-flex rounded-pill border border-hairline bg-bg-elev p-1">
        {(
          [
            ["overworld-to-nether", "Overworld → Nether"],
            ["nether-to-overworld", "Nether → Overworld"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={direction === value}
            onClick={() => setDirection(value)}
            className={`label-mono min-h-8 rounded-pill px-3 py-1.5 transition-colors ${direction === value ? "bg-surface text-ink" : "text-ink-dim hover:text-ink"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {(
          [
            ["x", "X"],
            ["y", "Y"],
            ["z", "Z"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label htmlFor={`npc-${key}`} className="label-mono mb-1.5 block text-ink-dim">
              {from} {label}
            </label>
            <input
              id={`npc-${key}`}
              type="number"
              value={x && key === "x" ? x : key === "y" ? y : z}
              onChange={(event) =>
                key === "x" ? setX(event.target.value) : key === "y" ? setY(event.target.value) : setZ(event.target.value)
              }
              className="w-28 rounded-control border border-hairline bg-bg-elev px-3 py-2 text-[15px] text-ink focus:border-brand"
            />
          </div>
        ))}
      </div>

      <div className="rounded-card border border-hairline bg-bg-elev p-4">
        <p className="label-mono mb-1 text-ink-dim">{to} coordinates</p>
        {result ? (
          <p className="font-mono text-lg text-brand-hi">
            X {result.x} · Y {result.y} · Z {result.z}
          </p>
        ) : (
          <p className="text-sm text-ink-dim">Enter valid numbers.</p>
        )}
      </div>

      <p className="text-sm text-ink-dim">
        Horizontal axes divide by 8 going into the Nether and multiply by 8 coming out - Y stays the same.
        A portal placed within 16 blocks (Nether) of the ideal position usually links to the same Overworld portal.
      </p>
    </div>
  );
}
