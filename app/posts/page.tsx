import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PostsList } from "@/components/posts-list";
import { SiteChrome } from "@/components/site-chrome";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文稿",
  description: "Tao Site 的文章列表。",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteChrome />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 pb-32 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <header className="mb-10 mt-8 flex flex-col items-center text-center">
          <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-ui-active text-ui-brand">
            <BookOpen size={20} strokeWidth={1.5} />
          </div>
          <h1 className="mb-4 font-serif text-3xl tracking-widest text-ui-primary">
            湖畔拾遗
          </h1>
          <div className="mb-4 h-px w-10 bg-ui-subtle" />
          <p className="font-serif text-[13px] italic tracking-wide text-ui-muted">
            记录随想、技术碎片与造林日志。
          </p>
        </header>

        <PostsList items={posts} />
      </main>
    </>
  );
}
