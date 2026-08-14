"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import { useReadingTracker } from "@lib/utils/readingTracker";

interface ReadBadgeProps {
  slug: string;
}

const ReadBadge: React.FC<ReadBadgeProps> = ({ slug }) => {
  const { isRead } = useReadingTracker();

  if (!isRead(slug)) return null;

  return (
    <span className="inline-flex items-center rounded-md bg-emerald-100/90 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
      <FaCheck className="mr-1 text-[8px]" /> Pernah Dibaca
    </span>
  );
};

export default ReadBadge;
