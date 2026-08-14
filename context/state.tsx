"use client";

import React, { createContext, useContext } from "react";
import posts from "../.json/posts.json";
import { PostItem } from "@/types";

interface SearchContextType {
  posts: PostItem[];
}

const SearchContext = createContext<SearchContextType>({
  posts: posts as PostItem[],
});

export const JsonContext = ({ children }: { children: React.ReactNode }) => {
  const state: SearchContextType = {
    posts: posts as PostItem[],
  };
  return (
    <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
