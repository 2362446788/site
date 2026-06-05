import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Divider } from "@/components/divider";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteChrome } from "@/components/site-chrome";
import {
  moments,
  projects,
  socialLinks,
  sections,
  site,
} from "@/lib/content";
import { getRecommendedPosts } from "@/lib/posts";

export default function Home() {
  const posts = getRecommendedPosts();

  return (
    <>
      <SiteChrome />
      <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-16 pt-16 md:px-8 md:pt-24">
        <section className="flex min-h-[430px] flex-col items-center justify-center text-center">
          <div className="size-24 overflow-hidden rounded-full border border-ui-subtle bg-ui-content p-1 shadow-ui-subtle">
            <Image
              src="/images/site/avatar.jpg"
              alt="Tao 的头像"
              width={88}
              height={88}
              priority
              className="size-full rounded-full object-cover"
            />
          </div>

          <h1 className="mt-8 flex flex-wrap items-center justify-center gap-2 font-serif text-3xl font-medium tracking-wide md:text-4xl">
            Hi there, I&apos;m
            <span className="relative inline-flex items-center rounded-xl bg-ui-brand-subtle px-4 py-1.5 font-sans text-2xl text-ui-brand sm:text-3xl">
              {site.name}
              <Sparkles
                size={16}
                className="absolute -right-2 -top-2 opacity-70"
              />
            </span>
          </h1>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg font-light text-ui-secondary md:text-xl">
            <span>{site.description.split('&')[0]}</span>
            <span className="opacity-60">&amp;</span>
            <span>{site.description.split('&')[1]}</span>
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ui-muted">
            Crafting quiet worlds.
          </p>
        </section>

        <section className="mt-8 flex flex-col items-center gap-9 md:mt-14">
          <div className="text-center font-serif text-[13px] italic leading-loose tracking-wide text-ui-muted">
            {site.quote.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-2 pr-4 text-right text-[11px] not-italic opacity-80">
              -- {site.quote.from}
            </p>
          </div>

          {/* <div className="flex items-center gap-4 font-mono text-xs text-ui-muted">
            {stats.map((stat, index) => (
              <span key={stat.label} className="flex items-center gap-4">
                <span className="transition hover:text-ui-secondary">
                  {stat.value} {stat.label}
                </span>
                {index < stats.length - 1 ? <span className="opacity-30">·</span> : null}
              </span>
            ))}
          </div> */}

          <div className="flex flex-wrap items-center justify-center gap-4 text-ui-muted">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              const isInternal = item.href.startsWith("/");

              return (
                <span key={item.label} className="group relative block">
                  <span className="pointer-events-none absolute left-1/2 top-0 z-10 min-w-max whitespace-nowrap rounded-xl bg-ui-content px-4 py-2 text-sm text-ui-secondary opacity-0 shadow-ui-subtle transition-all duration-300 -translate-x-1/2 -translate-y-[115%] group-hover:-translate-y-[135%] group-hover:opacity-100">
                    {item.label}
                  </span>
                  {isInternal ? (
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      style={{ "--hover-color": item.color } as CSSProperties}
                      className="block rounded-full border border-ui-subtle p-2 transition duration-300 hover:border-(--hover-color) hover:text-(--hover-color) hover:shadow-ui-subtle"
                    >
                      <Icon size={20} />
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      style={{ "--hover-color": item.color } as CSSProperties}
                      className="block rounded-full border border-ui-subtle p-2 transition duration-300 hover:border-(--hover-color) hover:text-(--hover-color) hover:shadow-ui-subtle"
                    >
                      <Icon size={20} />
                    </a>
                  )}
                </span>
              );
            })}
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeading {...sections[0]} />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
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
          <div className="mt-8 flex justify-end">
            <Link
              href="/projects"
              className="group flex items-center gap-1 text-[13px] text-ui-secondary transition hover:text-ui-brand"
            >
              查看完整项目
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeading {...sections[1]} />
          <div className="space-y-1">
            {posts.slice(0, 4).map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.id}`}
                style={{ "--row-delay": `${index * 70}ms` } as CSSProperties}
                className="group animate-post-row relative -mx-4 flex flex-col justify-between overflow-hidden rounded-xl border-b border-dashed border-ui-strong p-4 transition-colors duration-500 ease-out hover:bg-ui-hover hover:shadow-ui-subtle md:flex-row md:items-baseline md:gap-4"
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-ui-hover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative flex min-w-0 items-center gap-3">
                  <span className="block h-px w-0 shrink-0 bg-ui-strong transition-all duration-500 ease-out group-hover:w-3" />
                  <span className="min-w-0 text-[15px] text-ui-secondary transition-colors duration-500 ease-out group-hover:text-ui-primary">
                    {post.title}
                  </span>
                </span>
                <span className="relative mt-2 flex shrink-0 items-center gap-4 font-mono text-xs text-ui-muted transition-colors duration-500 group-hover:text-ui-secondary md:mt-0">
                  <span className="italic">{post.category}</span>
                  <span>{post.date}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Link
              href="/posts"
              className="group flex items-center gap-1 text-[13px] text-ui-secondary transition hover:text-ui-brand"
            >
              查看全部文稿
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeading {...sections[2]} />
          <div className="relative space-y-10 border-l border-dashed border-ui-strong pl-6">
            {moments.slice(0, 2).map((moment) => (
              <article key={moment.text} className="group relative">
                <div className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-ui-strong bg-ui-page transition group-hover:border-ui-brand" />
                <p className="text-sm leading-relaxed text-ui-secondary transition group-hover:text-ui-primary">
                  {moment.text}
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-xs text-ui-muted">
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
          <div className="mt-8 flex justify-end">
            <Link
              href="/timeline"
              className="group flex items-center gap-1 text-[13px] text-ui-secondary transition hover:text-ui-brand"
            >
              查看完整时间线
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
