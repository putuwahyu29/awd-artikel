import fs from "fs";
import RSS from "rss";
import getAllPostsData from "@lib/getAllPostsData";

export default async function generateRssFeed() {
  const BASE_URL = process.env.BASE_URL;

  const allPosts = await getAllPostsData();

  const feedOptions = {
    title: "Awd Artikel | Umpan RSS",
    description:
      "Di sini, Anda akan menemukan banyak artikel yang menarik dan informatif. Berbagai artikel tersebut berfokus pada topik mengenai teknologi.",
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/rss.xml`,
    image_url: `${BASE_URL}/images/favicon.png`,
    pubDate: new Date(),
    copyright: `Copyright &copy; 2023 - ${new Date().getFullYear()} Awd`,
  };

  const feed = new RSS(feedOptions);

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `${BASE_URL}/posts/${post.slug}`,
      date: post.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
