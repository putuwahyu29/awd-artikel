"use client";

import { useEffect, useState } from "react";

const useWindow = (size?: number): number => {
  const [windowSize, setWindowSize] = useState<number>(size || 768);
  useEffect(() => {
    function viewport() {
      if (typeof window !== "undefined") {
        const width = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        setWindowSize(width);
      }
    }
    viewport();
    window.addEventListener("resize", viewport);
    return () => {
      window.removeEventListener("resize", viewport);
    };
  }, []);

  return windowSize;
};

export default useWindow;
