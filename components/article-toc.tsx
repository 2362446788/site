"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Menu, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import type { TocItem } from "@/lib/toc";

type ArticleTocProps = {
  items: TocItem[];
};

const TOC_SCROLL_OFFSET = 28;
const TOC_ACTIVE_OFFSET = 64;

function getHeadingElements(ids: string[]) {
  return ids
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element));
}

function scrollToHeading(id: string, options?: { updateHash?: boolean; behavior?: ScrollBehavior }) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - TOC_SCROLL_OFFSET;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: options?.behavior ?? "smooth",
  });

  if (options?.updateHash !== false) {
    window.history.replaceState(null, "", `#${encodeURIComponent(id)}`);
  }
}

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    let elements = getHeadingElements(ids);

    if (!elements.length) {
      return;
    }

    const calculateActiveHeading = () => {
      if (!refreshElements()) {
        return;
      }

      const positions = elements
        .map((element) => ({
          id: element.id,
          top: element.getBoundingClientRect().top,
        }))
        .sort((a, b) => a.top - b.top);

      const passed = positions.filter((item) => item.top <= TOC_ACTIVE_OFFSET);

      if (passed.length > 0) {
        setActiveId(passed[passed.length - 1].id);
        return;
      }

      const upcoming = positions.find((item) => item.top > 0);

      if (upcoming) {
        setActiveId(upcoming.id);
      }
    };

    const refreshElements = () => {
      elements = getHeadingElements(ids);
      return elements.length > 0;
    };

    const observer = new IntersectionObserver(
      () => {
        calculateActiveHeading();
      },
      {
        rootMargin: "-12% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));
    calculateActiveHeading();

    let ticking = false;
    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(() => {
        calculateActiveHeading();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    const syncTimers: number[] = [];

    const syncHashPosition = () => {
      const rawHash = window.location.hash.slice(1);

      if (!rawHash) {
        return;
      }

      const id = decodeURIComponent(rawHash);

      if (!ids.includes(id)) {
        return;
      }

      const runSync = () => {
        scrollToHeading(id, { updateHash: false, behavior: "auto" });
      };

      runSync();
      requestAnimationFrame(runSync);
      requestAnimationFrame(() => requestAnimationFrame(runSync));
      syncTimers.push(window.setTimeout(runSync, 120));
      syncTimers.push(window.setTimeout(runSync, 320));
    };

    syncHashPosition();
    window.addEventListener("load", syncHashPosition);
    window.addEventListener("pageshow", syncHashPosition);
    window.addEventListener("hashchange", syncHashPosition);

    return () => {
      syncTimers.forEach((timerId) => window.clearTimeout(timerId));
      window.removeEventListener("load", syncHashPosition);
      window.removeEventListener("pageshow", syncHashPosition);
      window.removeEventListener("hashchange", syncHashPosition);
    };
  }, [ids]);

  return activeId;
}

function TocList({
  items,
  activeId,
  onNavigate,
  variant = "desktop",
}: ArticleTocProps & {
  activeId: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToHeading(id);
    onNavigate?.();
  };

  if (variant === "desktop") {
    return (
      <ul className="lesson-toc-list">
        {items.map((item) => {
          const active = item.id === activeId;

          return (
            <li key={item.id} className="lesson-toc-item">
              <a
                href={`#${item.id}`}
                onClick={(event) => handleNavigate(event, item.id)}
                className={`lesson-toc-link ${
                  item.level === 3 ? "lesson-toc-link--h3" : ""
                } ${active ? "lesson-toc-link--active" : ""}`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label="文章目录" className="space-y-1">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => handleNavigate(event, item.id)}
            className={`block rounded-xl py-1.5 pr-3 text-sm leading-relaxed transition ${
              item.level === 3 ? "pl-9" : "pl-4"
            } ${
              active
                ? "bg-ui-active text-ui-primary"
                : "text-ui-secondary hover:bg-ui-hover hover:text-ui-primary"
            }`}
          >
            {item.text}
          </a>
        );
      })}
    </nav>
  );
}

export function MobileTocButton({ items }: ArticleTocProps) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveHeading(items);

  if (!items.length) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "关闭目录" : "打开目录"}
        aria-expanded={open}
        className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-ui-subtle bg-ui-float text-ui-muted shadow-ui-subtle backdrop-blur transition hover:bg-ui-hover hover:text-ui-primary xl:hidden"
      >
        {open ? <X size={17} /> : <Menu size={18} />}
      </button>

      {open ? (
        <div
          className="pointer-events-auto fixed inset-0 z-[60] bg-ui-backdrop xl:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="pointer-events-auto animate-toc-drawer-enter ml-auto flex h-dvh w-[min(78vw,28rem)] flex-col border-l border-ui-subtle bg-ui-page shadow-ui-strong"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-20 shrink-0 items-center gap-4 border-b border-ui-subtle px-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭目录"
                className="flex size-10 items-center justify-center rounded-xl border border-ui-subtle bg-ui-float text-ui-muted shadow-ui-subtle transition hover:bg-ui-hover hover:text-ui-primary"
              >
                <X size={18} />
              </button>
              <p className="font-serif text-lg font-semibold text-ui-primary">目录</p>
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-5 py-6">
              <TocList
                items={items}
                activeId={activeId}
                onNavigate={() => setOpen(false)}
                variant="mobile"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DesktopToc({ items }: ArticleTocProps) {
  const [collapsed, setCollapsed] = useState(false);
  const activeId = useActiveHeading(items);

  if (!items.length) {
    return null;
  }

  return (
    <div
      className={`lesson-toc-wrapper ${collapsed ? "lesson-toc-wrapper--collapsed" : ""}`}
      style={{ opacity: 1, width: collapsed ? 44 : 220 }}
    >
      <div className="lesson-toc-inner-wrap">
        <aside className="lesson-toc">
          <div className="lesson-toc-inner" style={{ opacity: 1 }}>
            <div className="lesson-toc-title-row">
              {collapsed ? null : <h4 className="lesson-toc-title">目录</h4>}
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-label={collapsed ? "Expand TOC" : "Collapse TOC"}
                aria-expanded={!collapsed}
                className="lesson-toc-collapse-btn"
              >
                {collapsed ? <PanelRightOpen size={14} /> : <PanelRightClose size={14} />}
              </button>
            </div>

            {collapsed ? null : <TocList items={items} activeId={activeId} />}
          </div>
        </aside>
      </div>
    </div>
  );
}
