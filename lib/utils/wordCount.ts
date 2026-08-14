const wordCount = (content?: string): string => {
  if (!content) return "0 kata";
  const cleanContent = content
    .replace(/^#+\s+/gm, "")
    .replace(/[*_~`]/g, "")
    .replace(/<[^>]*>/g, "");
  const count = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  return `${count.toLocaleString("id-ID")} kata`;
};

export default wordCount;
