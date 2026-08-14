import React from "react";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ParsedPage } from "@lib/contentParser";

interface DefaultProps {
  data: ParsedPage;
}

export default function Default({ data }: DefaultProps) {
  const { frontmatter, content } = data;
  const { title } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <div className="content">
          <MDXRemote
            source={content}
            components={shortcodes}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
