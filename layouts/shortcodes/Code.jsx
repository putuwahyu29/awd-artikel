import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { FaCopy, FaCheck } from "react-icons/fa";

const HighlightedCode = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!children) return;
    const textToCopy =
      typeof children === "string" ? children : String(children);
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative group my-4 overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 flex items-center space-x-1.5 rounded-lg bg-gray-800/80 px-2.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md opacity-80 hover:opacity-100 hover:bg-gray-700 transition-all duration-200"
        title="Salin Kode"
      >
        {isCopied ? (
          <>
            <FaCheck className="text-emerald-400 text-xs" />
            <span className="text-emerald-400">Tersalin!</span>
          </>
        ) : (
          <>
            <FaCopy className="text-xs" />
            <span>Copy</span>
          </>
        )}
      </button>
      <SyntaxHighlighter language={language} style={a11yDark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default HighlightedCode;

