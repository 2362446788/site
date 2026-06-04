import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GithubSlugger from "github-slugger";
import { ArrowLeft, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { DesktopToc } from "@/components/article-toc";
import { CollapsibleCode } from "@/components/collapsible-code";
import { SiteChrome } from "@/components/site-chrome";
import { getAllPostIds, getPostById } from "@/lib/posts";
import { extractToc } from "@/lib/toc";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type RehypeNode = {
  tagName?: string;
  value?: unknown;
  data?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  children?: RehypeNode[];
};

function getRehypeNodeText(node: RehypeNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return node.children?.map(getRehypeNodeText).join("") ?? "";
}

function rehypeHeadingIds() {
  return (tree: unknown) => {
    const slugger = new GithubSlugger();

    const visit = (node: unknown) => {
      if (!node || typeof node !== "object") {
        return;
      }

      const element = node as RehypeNode;

      if (
        (element.tagName === "h2" || element.tagName === "h3") &&
        element.properties?.id === undefined
      ) {
        const text = getRehypeNodeText(element).trim();

        if (text) {
          element.properties = {
            ...element.properties,
            id: slugger.slug(text),
          };
        }
      }

      element.children?.forEach(visit);
    };

    visit(tree);
  };
}

function rehypeCodeRawValue() {
  return (tree: unknown) => {
    const visit = (node: unknown) => {
      if (!node || typeof node !== "object") {
        return;
      }

      const item = node as {
        tagName?: string;
        data?: Record<string, unknown>;
        properties?: Record<string, unknown>;
        children?: unknown[];
      };

      if (item.tagName === "pre") {
        const code = item.children?.find((child) => {
          return Boolean(
            child && typeof child === "object" && (child as { tagName?: string }).tagName === "code",
          );
        }) as { data?: Record<string, unknown>; children?: unknown[] } | undefined;
        const text = code?.children?.find((child) => {
          return Boolean(child && typeof child === "object" && "value" in child);
        }) as { value?: unknown } | undefined;

        if (code && typeof text?.value === "string") {
          code.data = {
            ...code.data,
            rawCode: text.value.replace(/\n$/, ""),
          };
        }
      }

      item.children?.forEach(visit);
    };

    visit(tree);
  };
}

function getRawCodeMeta(code?: {
  data?: Record<string, unknown>;
  properties?: Record<string, unknown>;
}) {
  const meta = code?.data?.meta;

  if (typeof meta === "string") {
    return meta;
  }

  if (meta && typeof meta === "object" && "__raw" in meta) {
    return String((meta as { __raw?: unknown }).__raw ?? "");
  }

  return String(code?.properties?.metastring ?? "");
}

function getCodeMaxHeight(meta: string) {
  const match = meta.match(/\bmaxHeight=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function rehypeCodeBlockOptions() {
  return (tree: unknown) => {
    const visit = (node: unknown) => {
      if (!node || typeof node !== "object") {
        return;
      }

      const element = node as {
        tagName?: string;
        properties?: Record<string, unknown>;
        children?: unknown[];
        data?: Record<string, unknown>;
      };

      if (
        element.tagName === "figure" &&
        element.properties?.["data-rehype-pretty-code-figure"] !== undefined
      ) {
        const pre = element.children?.find((child) => {
          return Boolean(
            child && typeof child === "object" && (child as { tagName?: string }).tagName === "pre",
          );
        }) as { properties?: Record<string, unknown>; children?: unknown[] } | undefined;
        const code = pre?.children?.find((child) => {
          return Boolean(
            child && typeof child === "object" && (child as { tagName?: string }).tagName === "code",
          );
        }) as { data?: Record<string, unknown>; properties?: Record<string, unknown> } | undefined;
        const maxHeight = getCodeMaxHeight(getRawCodeMeta(code));

        if (pre?.properties) {
          const rawCode = code?.data?.rawCode;

          if (typeof rawCode === "string") {
            pre.properties.rawCode = rawCode;
          }

          if (maxHeight) {
            pre.properties["data-max-height"] = maxHeight;
          }
        }
      }

      element.children?.forEach(visit);
    };

    visit(tree);
  };
}

export function generateStaticParams() {
  return getAllPostIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostById(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostById(slug);

  if (!post) {
    notFound();
  }

  const isUpdated =
    new Date(`${post.updatedAt}T00:00:00`).getTime() >
    new Date(`${post.publishedAt}T00:00:00`).getTime();
  const tocItems = extractToc(post.content);

  return (
    <>
      <SiteChrome tocItems={tocItems} />
      <DesktopToc items={tocItems} />
      <main className="mx-auto min-h-screen w-full max-w-[760px] px-4 pb-32 pt-20 sm:px-6 md:pt-28 lg:px-8">
          <Link
            href="/posts"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-ui-muted transition hover:text-ui-brand"
          >
            <ArrowLeft size={14} />
            返回文稿
          </Link>

          <article>
            <header className="border-b border-dashed border-ui-strong pb-8">
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wider text-ui-muted">
                <span>
                  <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                  {isUpdated ? <span className="ml-0.5 text-ui-brand">（更新）</span> : null}
                </span>
                <span className="opacity-40">/</span>
                <span className="text-ui-brand opacity-80">{post.category}</span>
                <span className="opacity-40">/</span>
                <span className="flex items-center">
                  <Clock size={12} strokeWidth={1.5} className="mr-1 opacity-70" />
                  {post.readingTime} min
                </span>
              </div>
              <h1 className="font-serif text-3xl leading-tight text-ui-primary md:text-4xl">
                {post.title}
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-ui-secondary">
                {post.excerpt}
              </p>
            </header>

            <div className="article-content mt-10">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeHeadingIds,
                      rehypeCodeRawValue,
                      [
                        rehypePrettyCode,
                        {
                          theme: {
                            light: "github-light",
                            dark: "github-dark",
                          },
                          keepBackground: false,
                        },
                      ],
                      rehypeCodeBlockOptions,
                    ],
                  },
                }}
                components={{
                  pre: CollapsibleCode,
                }}
              />
            </div>
          </article>
      </main>
    </>
  );
}
