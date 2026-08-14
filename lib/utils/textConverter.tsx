import React from "react";
import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content?: string): string | null => {
  if (!content) return null;
  return slug(content);
};

// markdownify
export const markdownify = (
  content?: string,
  tag?: string,
  className?: string
): React.ReactNode => {
  if (!content) return null;

  const Tag = tag as any;
  return tag ? (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{
        __html:
          tag === "div" ? (marked.parse(content) as string) : (marked.parseInline(content) as string),
      }}
    />
  ) : (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: marked.parseInline(content) as string,
      }}
    />
  );
};

// humanize
export const humanize = (content?: string): string | null => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// plainify
export const plainify = (content?: string): string | null => {
  if (!content) return null;

  const mdParsed = marked.parseInline(String(content)) as string;
  const filterBrackets = mdParsed.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList: Record<string, string> = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity) => {
      return entityList[entity] || entity;
    }
  );
  return htmlWithoutEntities;
};
