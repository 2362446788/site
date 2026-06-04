import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostMeta } from '@/lib/types';

export type { Post, PostMeta } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

type PostFrontmatter = {
  id: string;
  title: string;
  category: string;
  draft?: boolean;
  recommend?: boolean;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
};

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year, month - 1, day);
}

export function formatChineseDate(value: string) {
  const date = parseDate(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day} ${weekdays[date.getDay()]}`;
}

export function formatRelativeDate(value: string) {
  const target = parseDate(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = today.getTime() - target.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) {
    return '今天';
  }

  if (diffDays === 1) {
    return '昨天';
  }

  if (diffDays < 7) {
    return `${diffDays} 天前`;
  }

  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} 周前`;
  }

  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} 月前`;
  }

  return `${Math.floor(diffDays / 365)} 年前`;
}

export function calculateReadingTime(content: string) {
  return Math.max(1, Math.ceil(readingTime(content).minutes));
}

function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function readPost(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  const displayDate = frontmatter.updatedAt || frontmatter.publishedAt;

  return {
    slug,
    ...frontmatter,
    draft: frontmatter.draft ?? false,
    recommend: frontmatter.recommend ?? false,
    date: formatRelativeDate(displayDate),
    readingTime: calculateReadingTime(content),
    publishedLabel: formatChineseDate(frontmatter.publishedAt),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = readPost(slug);
      const { content, ...meta } = post;
      void content;

      return meta;
    })
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(`${b.updatedAt || b.publishedAt}`).getTime() -
        new Date(`${a.updatedAt || a.publishedAt}`).getTime(),
    );
}

export function getRecommendedPosts() {
  return getAllPosts().filter((post) => post.recommend);
}

export function getPostById(id: string) {
  return (
    getPostSlugs()
      .map(readPost)
      .find((post) => post.id === id && !post.draft) ?? null
  );
}

export function getAllPostIds() {
  return getAllPosts().map((post) => post.id);
}
