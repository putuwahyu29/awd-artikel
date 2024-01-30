import fs from "fs";
import getAllPostsData from "@lib/getAllPostsData";

export default async function generateSiteMap() {
  const BASE_URL = process.env.BASE_URL;

  const allPosts = await getAllPostsData();

  function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${BASE_URL}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
       </url>
        <url>
          <loc>${`${BASE_URL}/posts`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
        </url>
        <url>
          <loc>${`${BASE_URL}/categories`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.65</priority>
        </url>
        <url>
          <loc>${`${BASE_URL}/privacy`}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.65</priority>
      </url>
       ${posts
         .map(({ slug }) => {
           return `
         <url>
             <loc>${`${BASE_URL}/posts/${slug}`}</loc>
             <lastmod>${new Date().toISOString()}</lastmod>
              <priority>0.80</priority>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
  }

  const sitemap = generateSiteMap(allPosts);

  fs.writeFileSync("./public/sitemap.xml", sitemap);
}
