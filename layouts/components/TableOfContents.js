import { useState } from "react";
import GithubSlugger from "github-slugger";
import { FaList, FaChevronDown, FaChevronUp } from "react-icons/fa";

const TableOfContents = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!content) return null;

  const slugger = new GithubSlugger();
  const headingLines = content.split("\n").filter((line) => {
    return line.match(/^#{2,3}\s+/);
  });

  if (headingLines.length === 0) return null;

  const headings = headingLines.map((line) => {
    const level = line.startsWith("###") ? 3 : 2;
    const text = line.replace(/^#{2,3}\s+/, "").replace(/[*_~`]/g, "").trim();
    const slug = slugger.slug(text);
    return { level, text, slug };
  });

  return (
    <div className="my-8 rounded-2xl border border-border/60 bg-gray-50/70 p-5 shadow-sm backdrop-blur-sm dark:border-darkmode-border/60 dark:bg-darkmode-theme-dark/30">
      <div
        className="flex cursor-pointer items-center justify-between font-bold text-dark dark:text-darkmode-light"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2.5 text-base">
          <FaList className="text-primary text-sm" />
          <span>Daftar Isi Artikel</span>
        </div>
        <button
          type="button"
          className="text-gray-500 hover:text-primary dark:text-darkmode-light/70"
          aria-label="Toggle Table of Contents"
        >
          {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 border-t border-gray-200/60 pt-3 dark:border-darkmode-border/40">
          <ul className="space-y-2 text-sm">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`${
                  heading.level === 3 ? "ml-4 text-xs" : "font-medium"
                }`}
              >
                <a
                  href={`#${heading.slug}`}
                  className="inline-block text-gray-700 transition-colors hover:text-primary hover:underline dark:text-darkmode-light/80 dark:hover:text-primary"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
