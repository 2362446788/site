"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useSiteTheme } from "@/app/providers";
import { MobileTocButton } from "@/components/article-toc";
import { navItems } from "@/lib/content";
import type { TocItem } from "@/lib/toc";

type SiteChromeProps = {
  tocItems?: TocItem[];
};

export function SiteChrome({ tocItems = [] }: SiteChromeProps) {
  const pathname = usePathname();
  const { toggleTheme } = useSiteTheme();

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto flex max-w-5xl justify-end gap-3 px-4 pt-4 md:pt-6">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="切换主题"
            className="pointer-events-auto cursor-pointer flex size-10 items-center justify-center rounded-full border border-ui-subtle bg-ui-float text-ui-muted shadow-ui-subtle backdrop-blur transition hover:bg-ui-hover hover:text-ui-primary"
          >
            <Moon size={16} className="dark:hidden" />
            <Sun size={16} className="hidden dark:block" />
          </button>
          <MobileTocButton items={tocItems} />
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-4 z-50 px-3 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-full max-w-[360px] items-center justify-center rounded-full border border-ui-subtle bg-ui-float p-1.5 shadow-ui-subtle backdrop-blur md:max-w-md">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`min-w-0 flex-1 rounded-full px-2.5 py-2 text-center text-[13px] transition md:text-sm ${
                  active
                    ? "bg-ui-active text-ui-primary shadow-ui-subtle"
                    : "text-ui-muted hover:bg-ui-hover hover:text-ui-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
