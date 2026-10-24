"use client";

import { useState } from "react";
import { codes } from "./MotdTool";

type Frame = { kind: "achievement" | "advancement" | "challenge" | "goal"; title: string; description: string; color: string };

const frames: { kind: Frame["kind"]; label: string; color: (code: string, text: string) => string }[] = [
  {
    kind: "achievement",
    label: "Achievement",
    color: (code, text) => `§7${code}${text}`,
  },
  {
    kind: "advancement",
    label: "Advancement",
    color: (code, text) => `§7${code}${text}`,
  },
  {
    kind: "challenge",
    label: "Challenge",
    color: (code, text) => `§7${code}${text}`,
  },
  {
    kind: "goal",
    label: "Goal",
    color: (code, text) => `§7${code}${text}`,
  },
];

/*
 * Vanilla chat toast colors:
 *  - Achievement/Advancement made: yellow title (§e), gray body (§7)
 *  - Challenge complete: light purple title (§d), gray body (§7)
 *  - Goal reached: green title (§a), gray body (§7)
 */
export function AchievementTool() {
  const [frame, setFrame] = useState<Frame["kind"]>("achievement");
  const [title, setTitle] = useState("Getting Wood");
  const [description, setDescription] = useState("Punch a tree until a block of wood pops out.");
  const [showDescription, setShowDescription] = useState(true);

  const titleColor = frame === "challenge" ? "d" : frame === "goal" ? "a" : "e";
  const verb =
    frame === "challenge" ? "Challenge Complete!" : frame === "goal" ? "Goal Reached!" : frame === "advancement" ? "Advancement Made!" : "Achievement Get!";

  const line = `§7[${verb} §e${titleColor === "e" ? title : title}§7]${showDescription ? `\n§7${description}` : ""}`;

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="label-mono mb-2 text-ink-dim">Frame type</legend>
        <div className="flex flex-wrap gap-2">
          {frames.map((option) => (
            <button
              key={option.kind}
              type="button"
              aria-pressed={frame === option.kind}
              onClick={() => setFrame(option.kind)}
              className={`min-h-9 rounded-pill border px-3 py-1.5 text-sm transition-colors ${frame === option.kind
                  ? "border-brand bg-surface text-ink"
                  : "border-hairline text-ink-muted hover:bg-white/5"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="ach-title" className="label-mono mb-2 block text-ink-dim">
          Title
        </label>
        <input
          id="ach-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
      </div>

      <div>
        <label htmlFor="ach-desc" className="label-mono mb-2 block text-ink-dim">
          Description
        </label>
        <input
          id="ach-desc"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink focus:border-brand"
        />
        <label className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={showDescription}
            onChange={(event) => setShowDescription(event.target.checked)}
            className="size-4 accent-brand"
          />
          Show description (as in advancements.json)
        </label>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">Toast preview</p>
        <div className="flex min-h-16 items-center gap-3 rounded-card border border-hairline bg-black p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-control border border-hairline bg-bg-elev text-lg" aria-hidden>
            🏆
          </span>
          <span className="font-mono text-sm leading-6">
            <span style={{ color: hexFor(titleColor) }}>{title}</span>
            {showDescription ? (
              <>
                <br />
                <span className="text-ink-dim">{description}</span>
              </>
            ) : null}
          </span>
        </div>
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">advancement title JSON (usable in chat plugins too)</p>
        <pre className="overflow-x-auto rounded-card border border-hairline bg-bg-elev p-4 font-mono text-[13px] text-[#A5D6FF]">
          {JSON.stringify({ frame, title: { text: title, color: nameFor(titleColor) }, description: { text: description, color: "gray" } }, null, 2)}
        </pre>
      </div>
      <p className="text-sm text-ink-dim">
        Chat output uses the classic codes: {line.replace(/\u00A7/g, "§")}
      </p>
    </div>
  );
}

function hexFor(code: string): string {
  return codes.find((item) => item.code === code)?.css.replace("color:#", "#") ?? "#FFFFFF";
}

function nameFor(code: string): string {
  return codes.find((item) => item.code === code)?.name ?? "white";
}
