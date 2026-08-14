import React from "react";
import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import Default from "@layouts/Default";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { PostItem } from "@/types";

export async function generateStaticParams() {
  const slugs = getSinglePage("content");
  return slugs.map((item: PostItem) => ({
    regular: item.slug,
  }));
}

export default async function RegularPage({
  params,
}: {
  params: Promise<{ regular: string }>;
}) {
  const { regular } = await params;
  const data = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {layout === "404" ? <NotFound data={data} /> : <Default data={data} />}
    </Base>
  );
}
