import type { Metadata } from "next";
import { MapPin, Milestone } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";
import { moments } from "@/lib/content";

export const metadata: Metadata = {
  title: "时间轴",
  description: "Tao Site 的近况时间轴。",
};

export default function TimelinePage() {
  return (
    <>
      <SiteChrome />
      <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-32 pt-20 md:px-8 md:pt-28">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3 text-ui-brand">
            <Milestone size={22} />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-ui-muted">
              Timeline
            </span>
          </div>
          <h1 className="font-serif text-4xl text-ui-primary md:text-5xl">林间回音</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ui-secondary md:text-base">
            不完整地记录每天推进的一点点东西，保留还没变成文章的想法。
          </p>
        </header>

        <div className="relative space-y-10 border-l border-dashed border-ui-strong pl-6">
          {moments.map((moment) => (
            <article key={moment.text} className="group relative">
              <div className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-ui-strong bg-ui-page transition group-hover:border-ui-brand" />
              <p className="text-sm leading-relaxed text-ui-secondary transition group-hover:text-ui-primary md:text-base">
                {moment.text}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-ui-muted">
                <span>{moment.date}</span>
                {moment.location ? (
                  <>
                    <span className="opacity-30">|</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {moment.location}
                    </span>
                  </>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
