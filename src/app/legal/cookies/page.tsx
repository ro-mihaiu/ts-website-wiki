import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "The TheySix Wiki cookie and browser-storage notice, including audio preferences and embedded media.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return <LegalPage eyebrow="LEGAL / COOKIES" title="Cookie Notice" description="What the Wiki stores in your browser, what it does not use, and how embedded services may behave." updated="October 24, 2026" sections={[
    { heading: "At a glance", paragraphs: ["The TheySix Wiki does not use advertising cookies, analytics cookies, social tracking pixels, or a consent banner for non-essential tracking because the site does not load those systems.", "The application uses small browser storage values for functionality. These values are not used to identify you, build a profile, or follow you across websites."] },
    { heading: "Functional browser storage", bullets: ["Audio preference: local storage key theysix:sound-choice remembers whether you entered with sound or muted audio. This lets the audio control respect your choice on later visits.", "Opening state: session storage key theysix:entered supports the page transition and focus behavior for the current tab. It is temporary and is not a persistent cookie."] },
    { heading: "What is a cookie?", paragraphs: ["A cookie is a small value stored by a website in a browser. Local storage and session storage are related browser technologies with different lifetimes and access rules. This notice covers all three so the behavior is easy to understand.", "Your browser may also receive technical cookies from the hosting provider or from an embedded external service. Those are controlled by the relevant provider, not by the Wiki application."] },
    { heading: "Embedded video", paragraphs: ["When a page includes a YouTube video, the embedded player may make requests to YouTube and may use provider-controlled cookies or similar technologies. You can block the player with browser settings or avoid opening the video."] },
    { heading: "Managing storage", paragraphs: ["You can delete local storage, session storage, and cookies through your browser's site settings. Blocking all storage may cause the audio preference or page transition to reset, but the articles remain readable.", "For provider-controlled cookies, use the privacy and cookie controls offered by the provider. The browser's developer and site-data settings can also show which domain stored a value."] },
  ]} />;
}
