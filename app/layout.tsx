import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Inter,
  JetBrains_Mono,
  Lora,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { getSiteUrlObject } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "Tao Site",
    template: "%s - Tao Site",
  },
  description: "一个安静、轻量、适配移动端的个人数字花园。",
  keywords: ["blog", "digital garden", "Next.js", "Tao Site"],
  authors: [{ name: "Tao" }],
  openGraph: {
    title: "Tao Site",
    description: "一个安静、轻量、适配移动端的个人数字花园。",
    type: "website",
  },
};

const themeInitScript = `
  (() => {
    try {
      const stored = localStorage.getItem("theme");
      const theme = stored === "light" || stored === "dark"
        ? stored
        : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.style.colorScheme = theme;
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} ${notoSansSc.variable} ${notoSerifSc.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-ui-page font-sans text-ui-primary antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
