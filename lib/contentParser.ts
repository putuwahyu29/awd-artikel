import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { PostItem, PostFrontmatter } from "@/types";

export interface ParsedPage {
  frontmatter: PostFrontmatter;
  content: string;
}

// get list page data, ex: _index.md / _index.yaml
export const getListPage = async (filePath: string): Promise<ParsedPage> => {
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
  let pageDataParsed: { data: any; content: string };

  if (targetPath.endsWith(".yaml")) {
    try {
      const data = yaml.load(pageData);
      pageDataParsed = { data: data || {}, content: "" };
    } catch {
      pageDataParsed = matter(pageData) as any;
    }
  } else {
    pageDataParsed = matter(pageData) as any;
  }

  const notFoundPath = fs.existsSync("content/404.mdx") ? "content/404.mdx" : "content/404.md";
  const notFoundPage = fs.readFileSync(notFoundPath, "utf-8");
  const notFoundDataParsed = matter(notFoundPage);
  let frontmatter: PostFrontmatter;
  let content: string;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data as PostFrontmatter;
  }

  return {
    frontmatter,
    content,
  };
};

// get all single pages, ex: blog/post.md or blog/post.mdx
export const getSinglePage = (folder: string): PostItem[] => {
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
    const frontmatter: PostFrontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter, slug: url, content };
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
export const getRegularPage = async (slug: string): Promise<ParsedPage> => {
  const publishedPages = getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPath = fs.existsSync("content/404.mdx") ? "content/404.mdx" : "content/404.md";
  const notFoundPage = fs.readFileSync(notFoundPath, "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter: PostFrontmatter;
  let content: string;

  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data as PostFrontmatter;
  }

  return {
    frontmatter,
    content,
  };
};
