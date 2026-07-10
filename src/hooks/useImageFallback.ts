import { useEffect, useState } from "react";

const failedAssets = new Set<string>();

export function useImageFallback(src: string) {
  const [failed, setFailed] = useState(() => failedAssets.has(src));

  useEffect(() => setFailed(failedAssets.has(src)), [src]);

  const markFailed = () => {
    failedAssets.add(src);
    setFailed(true);
  };

  return { failed, markFailed };
}
