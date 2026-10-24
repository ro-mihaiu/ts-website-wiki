"use client";

import { useMemo, useState } from "react";

const STACK = 64;
const CHEST_STACKS = 27;
const SHULKER_STACKS = 27;
const DBL_CHEST_STACKS = 54;

export function InventoryStackCalculatorTool() {
  const [items, setItems] = useState("12345");

  const n = Number(items.replace(/,/g, ""));

  const breakdown = useMemo(() => {
    if (!Number.isFinite(n) || n < 0) return null;
    const stacks = n / STACK;
    const shulkers = n / (STACK * SHULKER_STACKS);
    const chests = n / (STACK * CHEST_STACKS);
    const dblChests = n / (STACK * DBL_CHEST_STACKS);
    const exactStacks = Math.floor(n / STACK);
    const remainder = n % STACK;
    return {
      stacks,
      shulkers,
      chests,
      dblChests,
      exact: remainder === 0 ? `${exactStacks} stacks exactly` : `${exactStacks} stacks + ${remainder} item${remainder === 1 ? "" : "s"}`,
      shulkerFill: Math.floor(shulkers),
      chestFill: Math.floor(chests),
    };
  }, [n]);

  const rows = [
    { label: "Stack (64)", value: breakdown ? `${breakdown.stacks.toFixed(2)}` : "-" },
    { label: "Chest (27 stacks = 1,728)", value: breakdown ? `${breakdown.chests.toFixed(2)}` : "-" },
    { label: "Double chest (54 stacks = 3,456)", value: breakdown ? `${breakdown.dblChests.toFixed(2)}` : "-" },
    { label: "Shulker box (27 stacks = 1,728)", value: breakdown ? `${breakdown.shulkers.toFixed(2)}` : "-" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="isc-items" className="label-mono mb-2 block text-ink-dim">
          Item count
        </label>
        <input
          id="isc-items"
          type="text"
          inputMode="numeric"
          value={items}
          onChange={(event) => setItems(event.target.value)}
          className="w-full max-w-xs rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <div className="overflow-hidden rounded-card border border-hairline">
        <table className="w-full text-left text-[14.5px]">
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 0 ? "bg-white/[0.02]" : ""}>
                <th scope="row" className="label-mono border-b border-hairline px-4 py-2.5 font-normal text-ink-dim last:border-b-0">
                  {row.label}
                </th>
                <td className="border-b border-hairline px-4 py-2.5 font-mono text-brand-hi last:border-b-0">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {breakdown ? (
        <p className="text-sm text-ink-muted">{breakdown.exact}.</p>
      ) : (
        <p className="text-sm text-ink-dim">Enter a non-negative number.</p>
      )}
    </div>
  );
}
