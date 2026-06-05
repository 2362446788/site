import type { Metadata } from "next";
import { Bubbles, PencilLine, SignpostBig, UserRound } from "lucide-react";
import { IndexPageHero } from "@/components/index-page-hero";
import { SiteChrome } from "@/components/site-chrome";
import { aboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.description,
};

const aboutIcons = {
  intro: UserRound,
  pencil: PencilLine,
  signpost: SignpostBig,
  bubbles: Bubbles,
} as const;

export default function AboutPage() {
  return (
    <>
      <SiteChrome />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <IndexPageHero
          icon={UserRound}
          title={aboutPage.title}
          description={aboutPage.description}
        />

        <div className="space-y-10">
          <section className="rounded-[1.75rem] border border-ui-subtle bg-ui-page/90 px-5 py-6 shadow-ui-subtle sm:px-7 sm:py-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-ui-active text-ui-brand">
                <aboutIcons.intro size={18} strokeWidth={1.6} />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ui-muted">
                  {aboutPage.introLabel}
                </p>
                <h2 className="mt-1 font-serif text-xl text-ui-primary">
                  {aboutPage.introHeading}
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {aboutPage.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15px] leading-8 text-ui-secondary sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <div className="grid gap-5">
            {aboutPage.sections.map((section) => {
              const Icon = aboutIcons[section.iconKey as keyof typeof aboutIcons];

              return (
                <section
                  key={section.heading}
                  className="rounded-[1.5rem] border border-ui-subtle bg-ui-page/90 px-5 py-5 shadow-ui-subtle"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-ui-active text-ui-brand">
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ui-muted">
                        {section.label}
                      </p>
                      <h2 className="mt-1 font-serif text-xl text-ui-primary">
                        {section.heading}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-ui-secondary sm:text-[15px]">
                    {section.body}
                  </p>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
