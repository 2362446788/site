import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const [, , rawTitle = "新文章", rawSlug] = process.argv;
const title = rawTitle.trim() || "新文章";
const slug = (rawSlug || title)
  .trim()
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "") || `post-${Date.now()}`;

const postsDirectory = path.join(process.cwd(), "content/posts");
const filePath = path.join(postsDirectory, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: content/posts/${slug}.md`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const content = `---
id: "${randomUUID()}"
title: "${title.replaceAll('"', '\\"')}"
category: "随笔心得"
draft: true
recommend: false
publishedAt: "${today}"
updatedAt: "${today}"
excerpt: ""
---

在这里开始写正文。
`;

fs.mkdirSync(postsDirectory, { recursive: true });
fs.writeFileSync(filePath, content, "utf8");
console.log(`Created content/posts/${slug}.md`);
