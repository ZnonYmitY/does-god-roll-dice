import { useEffect, useState } from "react";
import { assets } from "../../config/assets";
import { skillById } from "../../data";
import type { SkillAttribute } from "../../types";

interface SkillPortraitProps {
  skill: string;
  size?: "small" | "medium" | "large";
}

export function SkillPortrait({ skill, size = "medium" }: SkillPortraitProps) {
  const definition = skillById.get(skill);
  const attribute: SkillAttribute = definition?.attribute ?? "intellect";
  const src = assets.skillPortrait(skill);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [src]);

  return (
    <div
      className={`skill-portrait skill-portrait--${attribute} skill-portrait--${size}`}
      aria-label={`${definition?.name ?? skill} 技能肖像`}
    >
      {!imageFailed && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && (
        <div className="skill-portrait__fallback" aria-hidden="true">
          <span>{definition?.name.toLocaleUpperCase() ?? skill.toLocaleUpperCase()}</span>
        </div>
      )}
    </div>
  );
}
