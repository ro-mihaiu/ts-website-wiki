"use client";

import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  House,
  Info,
  Pause,
  Play,
  Scale,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { TRACK } from "@/content/audio";

/**
 * The persistent dock: a spatial anchor that stays put across every route.
 *
 * Five destinations, with Home as the raised TS centre. Edition taxonomy
 * (Java, Bedrock, Builds) belongs to Library's filters, not to global
 * navigation, so it is deliberately absent here.
 *
 * Everything is a real link or button with a visible label - no hover-only
 * reveal, no icon without a name, and every target clears 44px.
 */

type Destination = {
  id: Category;
  href: string;
  label: string;
  icon: LucideIcon;
};

type Category = "wiki" | "events" | "about" | "main" | "socials" | "legal";

const DESTINATIONS: Destination[] = [
  { id: "wiki", href: "https://wiki-theysix.ro-mihaiu.xyz", label: "Wiki", icon: BookOpen },
  { id: "events", href: "https://events-theysix.ro-mihaiu.xyz", label: "Events", icon: CalendarDays },
  { id: "about", href: "https://theysix.ro-mihaiu.xyz/about", label: "About", icon: Info },
  { id: "main", href: "https://theysix.ro-mihaiu.xyz", label: "Main", icon: House },
  { id: "socials", href: "https://theysix.ro-mihaiu.xyz/socials", label: "Socials", icon: Share2 },
  { id: "legal", href: "/legal/terms", label: "Legal", icon: Scale },
];

const slotClass =
  "flex min-h-12 min-w-14 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 " +
  "text-ink-muted transition-colors duration-150 hover:bg-white/5 hover:text-ink sm:min-w-24";

const labelClass = "text-[9px] font-semibold tracking-[0.16em] uppercase sm:text-[10px]";

function Slot({ item, active }: { item: Destination; active?: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`${slotClass} aria-[current=page]:text-portal`}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className={labelClass}>{item.label}</span>
      </a>
    </li>
  );
}

function Divider() {
  return (
    <li aria-hidden="true" className="h-8 w-px shrink-0 self-center bg-rule" />
  );
}

function selectedCategory(pathname: string): Category {
  if (pathname.startsWith("/legal")) return "legal";
  if (pathname.startsWith("/w") || pathname.startsWith("/t")) return "wiki";
  return "main";
}

function orderedDestinations(selected: Category): Destination[] {
  if (selected === "main") return DESTINATIONS;

  const mainIndex = DESTINATIONS.findIndex((item) => item.id === "main");
  const selectedIndex = DESTINATIONS.findIndex((item) => item.id === selected);
  const items = [...DESTINATIONS];
  [items[mainIndex], items[selectedIndex]] = [items[selectedIndex], items[mainIndex]];
  return items;
}

/** The fifth slot is a control, not a destination: audio never gets a page. */
function AudioSlot() {
  const { choice, playing, enter, toggle } = useAudio();

  const label = playing
    ? `Pause ${TRACK.title} by ${TRACK.artist}`
    : `Play ${TRACK.title} by ${TRACK.artist}`;

  return (
    <li>
      <button
        type="button"
        onClick={() => (choice === "unset" ? enter("sound") : toggle())}
        aria-label={label}
        className={slotClass}
      >
        {playing ? (
          <Pause className="size-4" aria-hidden="true" />
        ) : (
          <Play className="size-4" aria-hidden="true" />
        )}
        <span className={labelClass}>Audio</span>
      </button>
      {/* State is announced, never forced. */}
      <span aria-live="polite" className="sr-only">
        {choice === "unset"
          ? ""
          : playing
            ? `${TRACK.title} playing`
            : `${TRACK.title} paused`}
      </span>
    </li>
  );
}

export function Dock() {
  const pathname = usePathname();
  const destinations = orderedDestinations(selectedCategory(pathname));
  const left = destinations.slice(0, 3);
  const center = destinations[3];
  const right = destinations.slice(4);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <nav
        aria-label="Primary"
        className="t6-glass pointer-events-auto max-w-full rounded-[999px] px-3 py-2"
      >
        <ul className="flex items-center gap-1">
          {left.map((item) => (
            <Slot key={item.id} item={item} />
          ))}
          <Divider />

          {/* The selected category replaces Main in the center position. */}
          <li className="-my-3 px-1">
            <a
              href={center.href}
              aria-label={`THEYSIX ${center.label}`}
              aria-current="page"
              className="t6-dock-home grid size-16 place-items-center rounded-[999px] transition-colors duration-150 hover:border-action sm:size-[4.5rem]"
            >
              <center.icon className="size-6 text-portal" aria-hidden="true" />
              <span className={labelClass}>{center.label}</span>
            </a>
          </li>

          <Divider />
          {right.map((item) => (
            <Slot key={item.id} item={item} />
          ))}
          <AudioSlot />
        </ul>
      </nav>
    </div>
  );
}
