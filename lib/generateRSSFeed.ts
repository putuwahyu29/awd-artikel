import fs from "fs";
import RSS from "rss";
import config from "@config/index.json";
import getAllPostsData from "@lib/getAllPostsData";

const BASE_URL = config.site.base_url || "https://blog.awd.my.id";
const siteTitle = config.site.title || "Awd Artikel";
const metaAuthor = config.metadata.meta_author || "I Putu Agus Wahyu Dupayana";

export default async function generateRssFeed() {
  const allPosts = await getAllPostsData();

  const feedOptions: RSS.FeedOptions = {
    title: `${siteTitle} | RSS Feed`,
    description:
      "Blog teknologi, tutorial Linux, Proxmox VE, DevOps, Cloud Computing, dan Web Development oleh I Putu Agus Wahyu Dupayana.",
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/rss.xml`,
    image_url: `${BASE_URL}/images/favicon.png`,
    pubDate: new Date(),
    language: "id",
    copyright: `Copyright © 2023 - ${new Date().getFullYear()} ${siteTitle}`,
  };

  const feed = new RSS(feedOptions);

  allPosts.forEach((post) => {
    const postUrl = `${BASE_URL}/posts/${post.slug}`;
    const postCategories = Array.isArray(post.categories) ? post.categories : [];
    const postImage = post.image
      ? post.image.startsWith("http")
        ? post.image
        : `${BASE_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`
      : undefined;

    feed.item({
      title: post.title || "",
      description: post.description || post.content,
      url: postUrl,
      guid: postUrl,
      categories: postCategories,
      author: post.author || metaAuthor,
      date: post.date ? new Date(post.date) : new Date(),
      enclosure: postImage
        ? {
            url: postImage,
            type: "image/jpeg",
          }
        : undefined,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
