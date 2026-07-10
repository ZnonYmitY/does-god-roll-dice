import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { assetVariableSources } from "../config/assets";

export function useAssetCssVariables(): CSSProperties {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;
    const images = Object.entries(assetVariableSources).map(([variable, src]) => {
      const image = new Image();
      image.onload = () => {
        if (active) setLoaded((current) => ({ ...current, [variable]: true }));
      };
      image.src = src;
      return image;
    });

    return () => {
      active = false;
      images.forEach((image) => {
        image.onload = null;
      });
    };
  }, []);

  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(assetVariableSources).map(([variable, src]) => [
          variable,
          loaded[variable] ? `url("${src}")` : "none",
        ]),
      ) as CSSProperties,
    [loaded],
  );
}
