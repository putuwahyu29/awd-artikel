import config from "@config/index.json";
import social from "@config/social/index.json";
import { plainify } from "@lib/utils/textConverter";
import { PostFrontmatter } from "@/types";

const { base_url, title: siteTitle, logo } = config.site;
const { meta_author, meta_description, meta_image } = config.metadata;
const { about } = config.widgets;

const socialLinks = [
  social.github,
  social.website,
  social.youtube,
  social.instagram,
  social.tiktok,
  social.facebook,
  social.twitter,
  social.linkedin,
].filter(Boolean);

/**
 * Generate Schema.org WebSite structured data with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base_url}/#website`,
    name: siteTitle,
    url: base_url,
    description: meta_description,
    inLanguage: "id-ID",
    publisher: {
      "@id": `${base_url}/#author`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base_url}/search?key={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Schema.org Person (E-E-A-T) structured data for the author
 */
export function generatePersonSchema() {
  const authorAvatar = about.avatar
    ? about.avatar.startsWith("http")
      ? about.avatar
      : `${base_url}${about.avatar}`
    : `${base_url}${meta_image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${base_url}/#author`,
    name: about.name || meta_author,
    alternateName: ["Agus Wahyu", "Putu Wahyu", "AWD", "I Putu Agus Wahyu Dupayana"],
    url: social.website || "https://awd.my.id",
    image: authorAvatar,
    jobTitle: about.role || "Software Engineer & Content Creator",
    description: about.bio || meta_description,
    sameAs: socialLinks,
    knowsAbout: [
      "Linux",
      "Proxmox VE",
      "Tailscale VPN",
      "DevOps",
      "Docker",
      "Cloud Computing",
      "Google Cloud Platform (GCP)",
      "Web Development",
      "Next.js",
      "TypeScript",
      "Chrome OS & CrOS",
      "System Architecture",
    ],
  };
}

/**
 * Generate Schema.org BlogPosting structured data for single article
 */
export function generateBlogPostingSchema(
  frontmatter: PostFrontmatter,
  slug: string,
  content: string = ""
) {
  const postUrl = `${base_url}/${config.settings.blog_folder}/${slug}`;
  const postTitle = frontmatter.meta_title || frontmatter.title;
  const postDescription =
    frontmatter.description || plainify(content.slice(0, 160)) || meta_description;
  const postImage = frontmatter.image
    ? frontmatter.image.startsWith("http")
      ? frontmatter.image
      : `${base_url}${frontmatter.image}`
    : `${base_url}${meta_image}`;

  const publishedDate = frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined;
  const wordCount = content ? content.trim().split(/\s+/).length : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: postTitle,
    name: postTitle,
    description: postDescription,
    image: [postImage],
    datePublished: publishedDate,
    dateModified: publishedDate,
    inLanguage: "id-ID",
    wordCount: wordCount,
    articleSection: frontmatter.categories?.[0] || "Teknologi",
    keywords: frontmatter.categories?.join(", ") || "Linux, DevOps, Web Development",
    url: postUrl,
    author: {
      "@id": `${base_url}/#author`,
      "@type": "Person",
      name: frontmatter.author || about.name || meta_author,
      url: social.website || "https://awd.my.id",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${base_url}/#organization`,
      name: siteTitle,
      url: base_url,
      logo: {
        "@type": "ImageObject",
        url: `${base_url}${logo || "/images/favicon.png"}`,
      },
    },
  };
}

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${base_url}${item.url}`,
    })),
  };
}

/**
 * Generate Schema.org CollectionPage structured data
 */
export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  itemUrls: { name: string; url: string }[] = []
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: url.startsWith("http") ? url : `${base_url}${url}`,
    inLanguage: "id-ID",
    isPartOf: {
      "@id": `${base_url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: itemUrls.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${base_url}${item.url}`,
      })),
    },
  };
}
