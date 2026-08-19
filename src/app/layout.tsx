import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { AnimatedBackground } from "@/components/layout/animated-background";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Anime Archive — Walk Through the History of Anime",
    template: "%s | Anime Archive",
  },
  description:
    "Anime Archive is a digital museum and historical encyclopedia of Japanese animation — from the first animated shorts of 1917 to the streaming era. Explore eras, studios, creators, and landmark anime.",
  keywords: [
    "anime history",
    "anime archive",
    "japanese animation",
    "anime eras",
    "studio ghibli",
    "osamu tezuka",
    "anime encyclopedia",
  ],
  authors: [{ name: "Anime Archive" }],
  creator: "Anime Archive",
  openGraph: {
    type: "website",
    siteName: "Anime Archive",
    title: "Anime Archive — Walk Through the History of Anime",
    description:
      "A digital museum of anime history: eras, studios, creators, and landmark works from 1917 to today.",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Archive — Walk Through the History of Anime",
    description:
      "A digital museum of anime history: eras, studios, creators, and landmark works from 1917 to today.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <SkipLink />
        <AnimatedBackground />
        <SiteNav />
        <main id="main" className="flex-1 relative z-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}