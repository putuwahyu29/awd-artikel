"use client";

import Image, { ImageProps } from "next/image";
import React, { useEffect, useState } from "react";

interface ImageFallbackProps extends Omit<ImageProps, "src"> {
  src: string;
  fallback?: string;
}

const ImageFallback: React.FC<ImageFallbackProps> = (props) => {
  const { src, fallback = "/images/fallback.png", style, className, alt = "", ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      className={className}
      style={style}
      alt={alt}
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
