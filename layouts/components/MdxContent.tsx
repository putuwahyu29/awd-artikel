import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import shortcodes from "@shortcodes/all";

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      components={shortcodes}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
