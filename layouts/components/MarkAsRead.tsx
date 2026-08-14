"use client";

import { useEffect } from "react";
import { useReadingTracker } from "@lib/utils/readingTracker";

interface MarkAsReadProps {
  slug: string;
}

export default function MarkAsRead({ slug }: MarkAsReadProps) {
  const { markAsRead } = useReadingTracker();

  useEffect(() => {
    if (slug) {
      markAsRead(slug);
    }
  }, [slug, markAsRead]);

  return null;
}
