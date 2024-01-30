import config from "@config/config.json";
import { getListPage, getSinglePage } from "@lib/contentParser";
const { blog_folder } = config.settings;

export default async function getAllPostsData() {
  const homepage = await getListPage("content/_index.md");
  const posts = getSinglePage(`content/${blog_folder}`);

  const allPosts = posts.map((post) => ({
    slug: post.slug,
    content: post.content.replace(/\r?\n|\r/g, "").slice(0, 200),
    ...post.frontmatter,
  }));

  return allPosts;
}
