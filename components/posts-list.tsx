"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { Selector } from "@/components/selector";
import type { PostMeta } from "@/lib/posts";

type SortMode = "latest" | "updated" | "oldest";
const allCategoriesValue = "all";

const pageSize = 10;

const sortOptions: Array<{ value: SortMode; label: string }> = [
  { value: "latest", label: "最新" },
  { value: "updated", label: "最近更新" },
  { value: "oldest", label: "最早" },
];

function getTime(value: string) {
  return new Date(`${value}T00:00:00`).getTime();
}

function isUpdated(post: PostMeta) {
  return getTime(post.updatedAt) > getTime(post.publishedAt);
}

function getSortedPosts(items: PostMeta[], sortMode: SortMode) {
  if (sortMode === "oldest") {
    return [...items].sort((a, b) => getTime(a.publishedAt) - getTime(b.publishedAt));
  }

  if (sortMode === "updated") {
    return [...items].sort((a, b) => getTime(b.updatedAt) - getTime(a.updatedAt));
  }

  return [...items].sort((a, b) => getTime(b.publishedAt) - getTime(a.publishedAt));
}

export function PostsList({ items }: { items: PostMeta[] }) {
  const [page, setPage] = useState(1);
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [categoryFilter, setCategoryFilter] = useState(allCategoriesValue);

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(items.map((item) => item.category))].sort((a, b) =>
      a.localeCompare(b, "zh-CN")
    );

    return [
      { label: "全部", value: allCategoriesValue },
      ...categories.map((category) => ({
        label: category,
        value: category,
      })),
    ];
  }, [items]);

  const filteredPosts = useMemo(() => {
    if (categoryFilter === allCategoriesValue) {
      return items;
    }

    return items.filter((item) => item.category === categoryFilter);
  }, [items, categoryFilter]);

  const sortedPosts = useMemo(
    () => getSortedPosts(filteredPosts, sortMode),
    [filteredPosts, sortMode]
  );
  const totalPages = Math.ceil(sortedPosts.length / pageSize);
  const currentPosts = sortedPosts.slice((page - 1) * pageSize, page * pageSize);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);

    if (safePage === page) {
      return;
    }

    setPage(safePage);
    requestAnimationFrame(scrollToTop);
  };

  const changeSortMode = (nextMode: SortMode) => {
    if (nextMode === sortMode) {
      return;
    }

    setSortMode(nextMode);
    setPage(1);
    requestAnimationFrame(scrollToTop);
  };

  const changeCategoryFilter = (nextCategory: string) => {
    if (nextCategory === categoryFilter) {
      return;
    }

    setCategoryFilter(nextCategory);
    setPage(1);
    requestAnimationFrame(scrollToTop);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <div className="flex items-center font-mono text-xs text-ui-muted">
          <span className="mr-2 opacity-70">≡</span>
          {sortedPosts.length} / {items.length} 篇
        </div>
        <div className="flex w-fit items-center gap-3 self-end">
          <Selector
            ariaLabel="分类筛选"
            options={categoryOptions}
            value={categoryFilter}
            onChange={changeCategoryFilter}
            className="w-[7.25rem] shrink-0 max-w-full sm:w-[7.75rem] md:w-[8rem]"
          />
          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-ui-subtle bg-ui-active p-1 font-mono text-xs">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => changeSortMode(option.value)}
                className={`cursor-pointer rounded-md px-3 py-1.5 transition ${
                  sortMode === option.value
                    ? "bg-ui-page text-ui-primary shadow-sm"
                    : "text-ui-muted hover:text-ui-secondary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-8 sm:space-y-10">
        {currentPosts.map((post) => (
          <Link
            id={post.slug}
            key={post.slug}
            href={`/posts/${post.id}`}
            className="group relative -ml-4 flex cursor-pointer flex-col rounded-xl py-3 pl-4 transition-colors duration-500 hover:bg-ui-active sm:-ml-6 sm:pl-6"
          >
            <span className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full bg-ui-brand opacity-60 transition-all duration-500 ease-out group-hover:h-1/2" />
            <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wider text-ui-muted">
              <span>
                <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                {sortMode === "updated" && isUpdated(post) ? (
                  <span className="ml-0.5 text-ui-brand">（更新）</span>
                ) : null}
              </span>
              <span className="opacity-40">/</span>
              <span className="text-ui-brand opacity-80">{post.category}</span>
              <span className="opacity-40">/</span>
              <span className="flex items-center">
                <Clock size={12} strokeWidth={1.5} className="mr-1 opacity-70" />
                {post.readingTime} min
              </span>
            </div>
            <h2 className="mb-3 font-serif text-[17px] text-ui-primary transition-colors duration-300 group-hover:text-ui-brand">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-ui-secondary">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalItems={sortedPosts.length}
        pageSize={pageSize}
        onPageChange={goToPage}
        ariaLabel="文稿分页"
      />
    </>
  );
}
