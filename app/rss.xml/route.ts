import { site } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { createSiteUrl, getSiteUrl } from "@/lib/site";

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${createSiteUrl(`/posts/${post.id}`)}</link>
          <guid>${createSiteUrl(`/posts/${post.id}`)}</guid>
          <pubDate>${new Date(`${post.publishedAt}T00:00:00`).toUTCString()}</pubDate>
          <description><![CDATA[${post.excerpt}]]></description>
        </item>`
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${site.title}</title>
        <link>${getSiteUrl()}</link>
        <description>${site.description}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
