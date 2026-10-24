import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage, toolMetadata } from "@/components/wiki/tools/ToolPage";
import { DiscordTimestampsTool } from "@/components/wiki/tools/DiscordTimestampsTool";
import { DiscordColoredTextTool } from "@/components/wiki/tools/DiscordColoredTextTool";
import { MinecraftSmallTextTool } from "@/components/wiki/tools/MinecraftSmallTextTool";
import { MinecraftSkinDownloaderTool } from "@/components/wiki/tools/MinecraftSkinDownloaderTool";
import { ServerPropertiesTool } from "@/components/wiki/tools/ServerPropertiesTool";
import { MotdTool } from "@/components/wiki/tools/MotdTool";
import { ServerNameTool } from "@/components/wiki/tools/ServerNameTool";
import { AchievementTool } from "@/components/wiki/tools/AchievementTool";
import { NetherPortalCalculatorTool } from "@/components/wiki/tools/NetherPortalCalculatorTool";
import { InventoryStackCalculatorTool } from "@/components/wiki/tools/InventoryStackCalculatorTool";
import { RgbGradientTool } from "@/components/wiki/tools/RgbGradientTool";
import { wikiTools } from "@/content/wiki/tools";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return wikiTools.map((tool) => ({ slug: tool.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const tool = wikiTools.find((entry) => entry.slug === slug); return tool ? toolMetadata(tool.title, tool.description, `/t/${tool.slug}`) : { title: "Tool not found" }; }

export default async function ToolRoute({ params }: Props) {
  const { slug } = await params;
  const tool = wikiTools.find((entry) => entry.slug === slug);
  if (!tool) notFound();
  const body = (() => {
    switch (tool.slug) {
      case "discord-timestamps": return <DiscordTimestampsTool />;
      case "discord-colored-text": return <DiscordColoredTextTool />;
      case "minecraft-small-text": return <MinecraftSmallTextTool />;
      case "minecraft-skin-downloader": return <MinecraftSkinDownloaderTool />;
      case "minecraft-server-properties": return <ServerPropertiesTool />;
      case "minecraft-motd": return <MotdTool />;
      case "minecraft-server-name": return <ServerNameTool />;
      case "minecraft-achievements": return <AchievementTool />;
      case "nether-portal-calculator": return <NetherPortalCalculatorTool />;
      case "inventory-stack-calculator": return <InventoryStackCalculatorTool />;
      case "minecraft-rgb-gradient": return <RgbGradientTool />;
    }
  })();
  return <ToolPage title={tool.title} description={tool.description}>{body}</ToolPage>;
}
