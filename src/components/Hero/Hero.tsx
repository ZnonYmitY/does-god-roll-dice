import { useState } from "react";
import { assets } from "../../config/assets";

export function Hero() {
  const [titleReady, setTitleReady] = useState(false);
  const [subtitleReady, setSubtitleReady] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">AN UNCERTIFIED OBSERVATION</p>
      <h1
        id="hero-title"
        className={`hero__title${titleReady ? " hero__title--asset" : ""}`}
        data-text="上帝掷骰子吗？"
      >
        <span>上帝掷骰子吗？</span>
        <img
          src={assets.titles.home}
          alt=""
          aria-hidden="true"
          onLoad={() => setTitleReady(true)}
          onError={(event) => {
            event.currentTarget.hidden = true;
            setTitleReady(false);
          }}
        />
      </h1>
      <p className={`hero__subtitle${subtitleReady ? " hero__subtitle--asset" : ""}`}>
        <span>某些问题本不值得回答。遗憾的是，它们已经醒了。</span>
        <img
          src={assets.titles.homeSubtitle}
          alt=""
          aria-hidden="true"
          onLoad={() => setSubtitleReady(true)}
          onError={(event) => {
            event.currentTarget.hidden = true;
            setSubtitleReady(false);
          }}
        />
      </p>
    </section>
  );
}
