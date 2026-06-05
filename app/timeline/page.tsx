import type { Metadata } from "next";
import { MapPin, Milestone } from "lucide-react";
import { IndexPageHero } from "@/components/index-page-hero";
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
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <IndexPageHero
          icon={Milestone}
          title="林间回音"
          description="不完整地记录每天推进的一点点东西，保留还没变成文章的想法。"
        />

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
