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
    <span className={`asset-icon asset-icon--image ${className}`} aria-hidden={!alt}>
      <img
        className="asset-icon__source"
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
