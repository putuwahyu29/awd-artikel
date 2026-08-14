import React from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  title?: string;
  width?: number | string;
  height?: number | string;
  src: string;
}

const Video: React.FC<VideoProps> = ({ title, width = 500, height = "auto", src, ...rest }) => {
  return (
    <video
      className="overflow-hidden rounded"
      width={width}
      height={height}
      controls
      {...rest}
    >
      <source
        src={src.match(/^http/) ? src : `/videos/${src}`}
        type="video/mp4"
      />
      {title}
    </video>
  );
};

export default Video;
