"use client";

import { useEffect, useState } from "react";

const useLoadMore = <T>(items: T[], loadPerClick: number, mounted?: boolean) => {
  const [loadedItems, setLoadedItems] = useState<T[]>([]);
  const [next, setNext] = useState(loadPerClick);

  const loadItems = (start: number, end: number) => {
    const slicedItems = items.slice(start, end);
    setLoadedItems((prev) => [...prev, ...slicedItems]);
  };

  const loadItemsHandler = () => {
    loadItems(next, next + loadPerClick);
    setNext(next + loadPerClick);
  };

  useEffect(() => {
    loadItems(0, loadPerClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const loadItemsFinished = Number(items.length) === Number(loadedItems.length);

  return {
    loadedItems,
    loadItemsHandler,
    loadItemsFinished,
  };
};

export default useLoadMore;
