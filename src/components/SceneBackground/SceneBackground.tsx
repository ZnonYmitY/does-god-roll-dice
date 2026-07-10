import { useEffect, useState, type CSSProperties } from "react";
import { assets } from "../../config/assets";
import type { AppState } from "../../types";

interface SceneBackgroundProps {
  state: AppState;
}

export function SceneBackground({ state }: SceneBackgroundProps) {
  const [mobile, setMobile] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isResult = state === "revealing" || state === "result";
  const requestedUrl = isResult
    ? mobile
      ? assets.backgrounds.resultMobile
      : assets.backgrounds.resultDesktop
    : mobile
      ? assets.backgrounds.homeMobile
      : assets.backgrounds.homeDesktop;

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.onload = () => active && setLoadedUrl(requestedUrl);
    image.onerror = () => active && setLoadedUrl(null);
    image.src = requestedUrl;
    return () => {
      active = false;
    };
  }, [requestedUrl]);

  const style = loadedUrl
    ? ({ "--scene-background": `url("${loadedUrl}")` } as CSSProperties)
    : undefined;

  return (
    <div
      className={`background-layer background-layer--${isResult ? "result" : "home"}`}
      style={style}
      aria-hidden="true"
    />
  );
}
