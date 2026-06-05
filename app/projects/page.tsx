import type { Metadata } from "next";
import { Sprout } from "lucide-react";
import { IndexPageHero } from "@/components/index-page-hero";
import { ProjectCard } from "@/components/project-card";
import { SiteChrome } from "@/components/site-chrome";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "项目",
  description: "Tao Site 的项目和实验。",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteChrome />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <IndexPageHero
          icon={Sprout}
          title="生长的世界"
          description="一些正在生长的工具、站点、游戏和前端实验。先让它们小而稳定，再逐步扩展。"
        />

        <div className="grid gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              cardClassName="group cursor-pointer rounded-2xl border border-ui-subtle p-5 shadow-ui-subtle transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_var(--c-shadow-strong)]"
              iconClassName="rounded-xl p-2 transition-transform duration-500 group-hover:rotate-6"
              badgeClassName="rounded-full border border-ui-subtle bg-ui-page px-2.5 py-1 font-mono text-[10px] text-ui-secondary"
              titleClassName="mt-4 text-[15px] text-ui-primary"
              descriptionClassName="mt-2 text-[13px] leading-relaxed text-ui-secondary"
            />
          ))}
        </div>
      </main>
    </>
  );
}
