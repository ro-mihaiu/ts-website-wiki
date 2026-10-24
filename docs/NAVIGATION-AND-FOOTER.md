# THEYSIX navigation and footer contract

This document is a content and interaction contract for every THEYSIX site
rebuild. The visual treatment may change, but the destinations, slot order,
center-item behavior, footer coverage, and legal links must remain compatible.

## Primary navbar

The persistent navbar contains exactly seven visible slots in this default
order:

```text
Wiki - Events - About - Main (center) - Socials - Legal - Audio
```

Use the following destinations:

| Slot | Label | Destination |
| --- | --- | --- |
| 1 | Wiki | `https://wiki-theysix.ro-mihaiu.xyz` |
| 2 | Events | `https://events-theysix.ro-mihaiu.xyz` |
| 3 | About | `https://theysix.ro-mihaiu.xyz/about` |
| 4 | Main | `https://theysix.ro-mihaiu.xyz` |
| 5 | Socials | `https://theysix.ro-mihaiu.xyz/socials` |
| 6 | Legal | the wiki legal section, beginning at `https://wiki-theysix.ro-mihaiu.xyz/legal/terms` |
| 7 | Audio | the local audio control, not a page navigation |

The Main slot is the initial center slot. The Wiki site is the center of this
navigation system only when it is the selected destination. Do not replace the
seven-item order with a generic hamburger menu, a farm/library link, a
community link, or a route list owned by another site.

Use real links for the first six destinations. Audio is a button or equivalent
control that exposes its state, respects reduced motion and user gesture
requirements, and does not autoplay without consent.

## Center-slot replacement behavior

The center position is a selected-category slot. Selecting any of the first six
categories swaps that category into the center position and moves Main into the
selected category's original position. The other five non-audio positions keep
their canonical order.

In pseudocode:

```text
canonical = [Wiki, Events, About, Main, Socials, Legal, Audio]
selected = the category the visitor opened
swap(canonical[indexOf(Main)], canonical[indexOf(selected)])
render the resulting seven slots
```

The initial state is:

```text
Wiki - Events - About - Main (center) - Socials - Legal - Audio
```

When Wiki is selected, render:

```text
Main - Events - About - Wiki (center) - Socials - Legal - Audio
```

When Socials is selected, render:

```text
Wiki - Events - About - Socials (center) - Main - Legal - Audio
```

When Events is selected, render:

```text
Wiki - Main - About - Events (center) - Socials - Legal - Audio
```

When About is selected, render:

```text
Wiki - Events - Main - About (center) - Socials - Legal - Audio
```

When Legal is selected, render:

```text
Wiki - Events - About - Legal (center) - Socials - Main - Audio
```

Clicking Main restores the default state. The selected state may be derived
from the current site/category or persisted only for the current navigation
session, but it must not change the canonical external destinations.

The center item must remain visually identifiable, keyboard reachable, and
usable at mobile widths. Every item needs a visible label or an accessible
name, a visible focus state, and a minimum 44px hit target. Do not hide the
meaning of an item behind an icon-only hover interaction.

## Footer contract

Keep a persistent footer on every page, including articles, tools, legal pages,
not-found pages, and error pages. It should preserve the established three
section structure:

1. **Explore**
   - Wiki home
   - Java articles
   - Bedrock articles
   - Discord articles
2. **Community**
   - Main site
   - Events
   - About
   - Socials
3. **Legal**
   - Terms of Service: `https://wiki-theysix.ro-mihaiu.xyz/legal/terms`
   - Privacy Policy: `https://wiki-theysix.ro-mihaiu.xyz/legal/privacy`
   - Cookie Notice: `https://wiki-theysix.ro-mihaiu.xyz/legal/cookies`
   - Open Source Licenses: `https://wiki-theysix.ro-mihaiu.xyz/legal/open-source`

The footer brand copy should describe the current site accurately as a
THEYSIX Minecraft knowledge archive, with Java, Bedrock, and Discord guides,
references, and tools. It must not advertise routes or features that were
removed from the current site.

Retain the attribution that THEYSIX is not affiliated with Mojang Studios or
Microsoft and that Minecraft is a trademark of Mojang Studios. If audio is
available, identify the soundtrack and explain that playback begins only after
the visitor chooses sound.

Footer links to legal pages must remain available even when legal pages are
implemented on the wiki site rather than the main or events site. Legal pages
should use canonical HTTPS URLs, descriptive metadata, heading hierarchy,
keyboard-reachable navigation, and links to the other legal documents.

## Cross-site rules

- Main, Events, About, and Socials are external site links, not duplicated local
  pages in the wiki project.
- Wiki article pages remain under `/w/...`.
- Wiki tools remain under `/t/<tool-name>`.
- Legal pages owned by the wiki remain under `/legal/...`.
- Do not copy farm, staff, server, community, preview, profile, or capture
  assets into a wiki rebuild unless a specific wiki article references them.
- Preserve the same navbar and footer semantics across desktop and mobile;
  only the responsive presentation may change.
