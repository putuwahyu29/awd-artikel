/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, style, className, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  // Dynamically set height: auto or width: auto when sizing classes are used
  const customStyle = { ...style };
  if (className) {
    if (
      className.includes("w-full") ||
      className.includes("w-auto") ||
      className.includes("w-[")
    ) {
      if (!customStyle.height) {
        customStyle.height = "auto";
      }
    }
    if (
      className.includes("h-full") ||
      className.includes("h-auto") ||
      className.includes("h-[")
    ) {
      if (!customStyle.width) {
        customStyle.width = "auto";
      }
    }
  }

  return (
    <Image
      className={className}
      style={customStyle}
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
