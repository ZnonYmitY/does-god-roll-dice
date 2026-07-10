import { skillById } from "../../data";
import type { ResolvedSkillLine } from "../../types";
import { SkillPortrait } from "../SkillPortrait/SkillPortrait";

interface SkillVoiceProps {
  line: ResolvedSkillLine;
  index: number;
}

export function SkillVoice({ line, index }: SkillVoiceProps) {
  const skill = skillById.get(line.skill);
  return (
    <article
      className={`skill-voice skill-voice--${line.role}`}
      style={{ "--voice-index": index } as React.CSSProperties}
    >
      <SkillPortrait skill={line.skill} size="small" />
      <div className="skill-voice__copy">
        <h3>
          {skill?.name.toLocaleUpperCase() ?? line.skill.toLocaleUpperCase()}
          <span>{skill?.nameZh}</span>
        </h3>
        <p>{line.text}</p>
      </div>
    </article>
  );
}
