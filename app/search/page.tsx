"use client";

import React, { Suspense } from "react";
import Base from "@layouts/Baseof";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { useSearchContext } from "context/state";
import { useSearchParams } from "next/navigation";
import { PostItem } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key") || "";
  const keyword = slugify(key);
  const { posts } = useSearchContext();

  const searchResults = (posts || []).filter((product: PostItem) => {
    if (product.frontmatter.draft) {
      return false;
    }
    if (!keyword) return true;
    if (slugify(product.frontmatter.title || "")?.includes(keyword)) {
      return true;
    } else if (
      product.frontmatter.categories?.some((category: string) =>
        slugify(category)?.includes(keyword)
      )
    ) {
      return true;
    } else if (slugify(product.content || "")?.includes(keyword)) {
      return true;
    }
    return false;
  });

  return (
    <Base title={`Hasil dari pencarian ${key}`}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Hasil dari pencarian{" "}
            <span className="text-primary">{key}</span>
          </h1>
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((post: PostItem, i: number) => (
                <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
                  <Post post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              Pencarian tidak ditemukan
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Memuat hasil pencarian...</div>}>
      <SearchContent />
    </Suspense>
  );
}
