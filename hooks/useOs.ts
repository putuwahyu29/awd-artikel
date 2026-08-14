"use client";

import { useEffect, useState } from "react";

const useOs = (): boolean => {
  const [os, setOs] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.platform) {
      setOs(navigator.platform.indexOf("Mac") > -1);
    }
  }, []);

  return os;
};

export default useOs;
