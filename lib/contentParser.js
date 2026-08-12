import parseMDX from "@lib/utils/mdxParser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get list page data, ex: _index.md
export const getListPage = async (filePath) => {
  let targetPath = filePath;
  if (!fs.existsSync(targetPath)) {
    const yamlPath = filePath.replace(/\.(md|mdx)$/, ".yaml");
    const mdxPath = filePath.replace(/\.md$/, ".mdx");
    if (fs.existsSync(yamlPath)) {
      targetPath = yamlPath;
    } else if (fs.existsSync(mdxPath)) {
      targetPath = mdxPath;
    }
  }
  const pageData = fs.readFileSync(targetPath, "utf-8");
  const pageDataParsed = matter(pageData);
  const notFoundPath = fs.existsSync("content/404.mdx") ? "content/404.mdx" : "content/404.md";
  const notFoundPage = fs.readFileSync(notFoundPath, "utf-8");
  const notFoundDataParsed = matter(notFoundPage);
  let frontmatter, content;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md or blog/post.mdx
export const getSinglePage = (folder) => {
  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter(
    (file) => file.endsWith(".md") || file.endsWith(".mdx")
  );
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get a regular page data from many pages, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedPages = getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPath = fs.existsSync("content/404.mdx") ? "content/404.mdx" : "content/404.md";
  const notFoundPage = fs.readFileSync(notFoundPath, "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
