import { PostItem } from "@/types";

// sort by date
export const sortByDate = (array: PostItem[]): PostItem[] => {
  const sortedArray = [...array].sort(
    (a, b) =>
      new Date(b.frontmatter.date ? b.frontmatter.date : 0).getTime() -
      new Date(a.frontmatter.date ? a.frontmatter.date : 0).getTime()
  );
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: PostItem[]): PostItem[] => {
  const withWeight = array.filter((item) => item.frontmatter.weight);
  const withoutWeight = array.filter((item) => !item.frontmatter.weight);
  const sortedWeightedArray = withWeight.sort(
    (a, b) => (a.frontmatter.weight || 0) - (b.frontmatter.weight || 0)
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};
