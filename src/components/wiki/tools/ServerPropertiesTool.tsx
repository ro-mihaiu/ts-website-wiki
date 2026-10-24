"use client";

import { useMemo, useState } from "react";

type Field = {
  key: string;
  label: string;
  type: "number" | "boolean" | "text";
  values?: string[];
  min?: number;
  max?: number;
  hint?: string;
};

const fields: Field[] = [
  { key: "gamemode", label: "gamemode", type: "text", values: ["survival", "creative", "adventure", "spectator"], hint: "Default game mode for new players." },
  { key: "difficulty", label: "difficulty", type: "text", values: ["peaceful", "easy", "normal", "hard"], hint: "Peaceful disables hostile mob farms." },
  { key: "max-players", label: "max-players", type: "number", min: 1, max: 2147483647 },
  { key: "view-distance", label: "view-distance", type: "number", min: 3, max: 32, hint: "Lower values reduce lag." },
  { key: "simulation-distance", label: "simulation-distance", type: "number", min: 5, max: 32, hint: "Affects farm ticking ranges." },
  { key: "spawn-protection", label: "spawn-protection", type: "number", min: 0, max: 256 },
  { key: "allow-nether", label: "allow-nether", type: "boolean" },
  { key: "hardcore", label: "hardcore", type: "boolean" },
  { key: "pvp", label: "pvp", type: "boolean" },
  { key: "white-list", label: "white-list", type: "boolean" },
  { key: "command-blocks", label: "enable-command-block", type: "boolean" },
  { key: "motd", label: "motd", type: "text", hint: "Shown in the server list." },
];

const defaults: Record<string, string> = {
  gamemode: "survival",
  difficulty: "normal",
  "max-players": "20",
  "view-distance": "10",
  "simulation-distance": "10",
  "spawn-protection": "16",
  "allow-nether": "true",
  hardcore: "false",
  pvp: "true",
  "white-list": "false",
  "enable-command-block": "false",
  motd: "A Minecraft Server",
};

export function ServerPropertiesTool() {
  const [values, setValues] = useState<Record<string, string>>({ ...defaults });

  const output = useMemo(
    () =>
      Object.entries(values)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n"),
    [values],
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`sp-${field.key}`} className="label-mono mb-1.5 block text-ink-dim">
              {field.label}
            </label>
            {field.type === "boolean" ? (
              <select
                id={`sp-${field.key}`}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
                className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2 text-[14px] text-ink focus:border-brand"
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            ) : field.values ? (
              <select
                id={`sp-${field.key}`}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
                className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2 text-[14px] text-ink focus:border-brand"
              >
                {field.values.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`sp-${field.key}`}
                type={field.type === "number" ? "number" : "text"}
                min={field.min}
                max={field.max}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
                className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2 text-[14px] text-ink focus:border-brand"
              />
            )}
            {field.hint ? <p className="mt-1 text-xs text-ink-dim">{field.hint}</p> : null}
          </div>
        ))}
      </div>

      <div>
        <p className="label-mono mb-2 text-ink-dim">server.properties</p>
        <pre className="max-h-80 overflow-auto rounded-card border border-hairline bg-bg-elev p-4 font-mono text-[13px] leading-6 text-[#A5D6FF]">
          {output}
        </pre>
      </div>
    </div>
  );
}
