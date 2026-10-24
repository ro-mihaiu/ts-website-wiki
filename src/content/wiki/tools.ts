export type WikiTool = { slug: string; title: string; description: string };

export const wikiTools: WikiTool[] = [
  { slug: "discord-timestamps", title: "Discord Timestamps", description: "Build dynamic <t:…> timestamps that render in every viewer's local time." },
  { slug: "discord-colored-text", title: "Discord Colored Text", description: "Use ANSI code blocks to color your Discord messages." },
  { slug: "minecraft-small-text", title: "Minecraft Small Text", description: "Convert text to small caps using the custom Unicode glyph range." },
  { slug: "minecraft-skin-downloader", title: "Minecraft Skin Downloader", description: "Download any player's skin from their username." },
  { slug: "minecraft-server-properties", title: "Server Properties Generator", description: "Generate a ready-to-paste server.properties file." },
  { slug: "minecraft-motd", title: "MOTD Builder", description: "Preview and build your server's message of the day with color codes." },
  { slug: "minecraft-server-name", title: "Server Name Builder", description: "Style your server list entry name with section sign colors." },
  { slug: "minecraft-achievements", title: "Achievement Builder", description: "Create custom achievements, advancements, and challenges as chat text." },
  { slug: "nether-portal-calculator", title: "Nether Portal Calculator", description: "Convert Overworld and Nether coordinates (1:8 ratio) both ways." },
  { slug: "inventory-stack-calculator", title: "Inventory / Stack Calculator", description: "Turn item counts into shulker, chest, and stack breakdowns." },
  { slug: "minecraft-rgb-gradient", title: "RGB Gradient Text", description: "Generate per-character RGB gradient codes for Minecraft text." },
];
