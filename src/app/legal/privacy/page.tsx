import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the TheySix Wiki handles browser storage, requests, embedded media, and privacy choices.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage eyebrow="LEGAL / PRIVACY" title="Privacy Policy" description="A clear account of the information the TheySix Wiki processes when you browse, search, and use its tools." updated="October 24, 2026" sections={[
    { heading: "Controller and scope", paragraphs: ["This policy describes the TheySix Wiki website at wiki-theysix.ro-mihaiu.xyz. It covers the public wiki pages, search interface, interactive tools, and the browser storage used by the site.", "The site is designed as a low-data reference service. It does not ask you to create an account, and it does not intentionally collect names, email addresses, precise location, or Minecraft account credentials through the Wiki."] },
    { heading: "Information processed when you visit", paragraphs: ["Like most websites, the hosting platform may receive technical request information such as an IP address, user-agent string, requested URL, referrer, timestamp, and response status in server or security logs. These records are used to deliver, protect, troubleshoot, and measure the reliability of the site according to the hosting provider's terms.", "The Wiki application itself does not add an analytics SDK, advertising tracker, fingerprinting script, or behavioral profile to your browser."] },
    { heading: "Browser storage", bullets: ["theysix:sound-choice in local storage records whether you chose sound or muted audio. It is written after that choice and remains until your browser data is cleared or the audio preference is changed.", "theysix:entered in session storage supports the opening transition and keyboard focus behavior. It is temporary and normally disappears when the browser tab or session ends.", "The search field and tool inputs are not sent to a TheySix account system. They are used in the page unless a particular tool explicitly opens an external service."] },
    { heading: "Embedded and external services", paragraphs: ["Some articles can embed YouTube videos through youtube-nocookie.com after the page includes that video. The video provider may process connection data and set its own technical storage according to its policies.", "Links and downloads hosted by Discord, MediaFire, GitHub, Chunker, or other providers take you to independent services. Review their privacy notices before submitting information or downloading files."] },
    { heading: "Your choices", bullets: ["Clear site data in your browser to remove local storage values.", "Use browser controls or content settings to block embedded media and third-party requests.", "Do not submit personal information into a tool or external service unless you understand who receives it and why.", "Contact the TheySix community through the main site if you believe a page exposes personal information or violates a privacy right."] },
    { heading: "Children and changes", paragraphs: ["The Wiki is general Minecraft reference content and is not directed at collecting information from children. If a parent or guardian believes personal information has been submitted through a linked service, they should contact that service directly and the TheySix community for help locating the relevant page.", "This policy may change when the site's infrastructure, integrations, or legal obligations change. The effective date above identifies the current version."] },
  ]} />;
}
