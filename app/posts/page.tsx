import React from "react";
import BlogPaginationPage from "../page/[slug]/page";

export default async function PostsIndexPage() {
  return BlogPaginationPage({
    params: Promise.resolve({ slug: "1" }),
  });
}
