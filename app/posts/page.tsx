import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { IndexPageHero } from "@/components/index-page-hero";
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
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 pb-16 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <IndexPageHero
          icon={BookOpen}
          title="湖畔拾遗"
          description="记录随想、技术碎片与造林日志。"
        />

        <PostsList items={posts} />
      </main>
    </>
  );
}
