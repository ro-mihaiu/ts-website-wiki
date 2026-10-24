"use client";

import { useState } from "react";

/*
 * Character-name UUID lookup is not possible offline, so the tool accepts a
 * username and redirects to the public NameMC profile page where the skin
 * file can be downloaded. Honest about being a deep link, not a proxy.
 */
export function MinecraftSkinDownloaderTool() {
  const [username, setUsername] = useState("");
  const trimmed = username.trim();

  return (
    <div className="space-y-5">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (trimmed) {
            window.open(`https://namemc.com/profile/${encodeURIComponent(trimmed)}`, "_blank", "noopener");
          }
        }}
        className="flex flex-wrap items-end gap-3"
      >
        <div className="min-w-52 flex-1">
          <label htmlFor="msd-name" className="label-mono mb-2 block text-ink-dim">
            Minecraft username
          </label>
          <input
            id="msd-name"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="e.g. Notch"
            className="w-full rounded-control border border-hairline bg-bg-elev px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-dim focus:border-brand"
          />
        </div>
        <button
          type="submit"
          disabled={!trimmed}
          className="h-[42px] rounded-control bg-brand px-4 text-sm font-semibold text-[#07131A] transition-opacity disabled:opacity-40"
        >
          Open skin page
        </button>
      </form>
      <p className="text-sm text-ink-dim">
        Opens the player&apos;s profile with the current skin - download the PNG from there.
        Skins are 64×64 (or legacy 64×32) images you can edit and re-upload at minecraft.net.
      </p>
    </div>
  );
}
