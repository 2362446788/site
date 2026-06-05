import { navItems } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { createSiteUrl } from "@/lib/site";

export function GET() {
  const posts = getAllPosts();
  const staticUrls = navItems.map((item) => createSiteUrl(item.href));
  const staticUrlItems = staticUrls.map((url) => `<url><loc>${url}</loc></url>`);
  const postUrlItems = posts.map(
    (post) => `<url><loc>${createSiteUrl(`/posts/${post.id}`)}</loc><lastmod>${post.updatedAt}</lastmod></url>`
  );
  const urls = [...staticUrlItems, ...postUrlItems].join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    }
  );
}
