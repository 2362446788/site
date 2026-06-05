"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  footerVisibilityConfig,
  socialLinks,
} from "@/lib/content";

function shouldHideFooter(pathname: string) {
  if (footerVisibilityConfig.exact.includes(pathname)) {
    return true;
  }

  return footerVisibilityConfig.prefix.some((path) => pathname.startsWith(path));
}

export function SiteFooter() {
  const pathname = usePathname();
  const footerLinks = socialLinks;

  if (!pathname || shouldHideFooter(pathname)) {
    return null;
  }

  return (
    <footer className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 border-t border-ui-subtle px-4 pt-6 pb-28 font-mono text-xs text-ui-muted md:flex-row md:px-8">
      <div className="flex items-center gap-2">
        <span>© 2026</span>
        <span>Powered by</span>
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-ui-secondary"
        >
          Next.js
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {footerLinks.map((item, index) => {
          const isInternal = item.href.startsWith("/");

          return (
            <div key={item.label} className="contents">
              {isInternal ? (
                <Link href={item.href} className="transition hover:text-ui-secondary">
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-ui-secondary"
                >
                  {item.label}
                </a>
              )}
              {index < footerLinks.length - 1 ? <span className="opacity-50">·</span> : null}
            </div>
          );
        })}
        <span className="opacity-50">·</span>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-ui-secondary"
        >
          RSS 订阅
        </a>
        <span className="opacity-50">·</span>
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-ui-secondary"
        >
          站点地图
        </a>
      </div>
    </footer>
  );
}
