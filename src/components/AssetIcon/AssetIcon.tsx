import { useEffect, useState } from "react";

interface AssetIconProps {
  src: string;
  alt?: string;
  fallback: string;
  className?: string;
}

export function AssetIcon({ src, alt = "", fallback, className = "" }: AssetIconProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <span className={`asset-icon asset-icon--fallback ${className}`} aria-hidden="true">
        {fallback}
      </span>
    );
  }

  return (
    <img
      className={`asset-icon ${className}`}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
