import fs from "fs";
import config from "@config/index.json";
import getAllPostsData from "@lib/getAllPostsData";
import { getTaxonomy } from "@lib/taxonomyParser";

const { blog_folder } = config.settings;
const BASE_URL = config.site.base_url || "https://blog.awd.my.id";

export default async function generateSiteMap() {
  const allPosts = await getAllPostsData();
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");
  const now = new Date().toISOString();

  function createSiteMap(posts: any[], cats: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Hub Pages -->
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${BASE_URL}/posts</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>${BASE_URL}/categories</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.30</priority>
  </url>

  <!-- Category Archive Pages -->
  ${cats
    .map(
      (cat) => `
  <url>
    <loc>${BASE_URL}/categories/${cat}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`
    )
    .join("")}

  <!-- Articles -->
  ${posts
    .map((post) => {
      const postDate = post.date ? new Date(post.date).toISOString() : now;
      const postImage = post.image
        ? post.image.startsWith("http")
          ? post.image
          : `${BASE_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`
        : null;

      return `
  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>${
      postImage
        ? `
    <image:image>
      <image:loc>${postImage}</image:loc>
      <image:title>${(post.title || "").replace(/[<>&'"]/g, "")}</image:title>
    </image:image>`
        : ""
    }
  </url>`;
    })
    .join("")}
</urlset>
`;
  }

  const sitemap = createSiteMap(allPosts, categories);
  fs.writeFileSync("./public/sitemap.xml", sitemap.trim());
}
