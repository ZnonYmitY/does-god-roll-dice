import { forwardRef } from "react";
import { resultLevelLabels, shareTemplates, skillById } from "../../data";
import type { CheckResult } from "../../types";
import { DiceRoller } from "../DiceRoller/DiceRoller";
import { SkillPortrait } from "../SkillPortrait/SkillPortrait";

interface ShareCardProps {
  result: CheckResult;
}

function observationNumber(id: string): string {
  const compact = id.replace(/[^a-z0-9]/gi, "").slice(-6).toLocaleUpperCase();
  return compact.padStart(6, "0");
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(function ShareCard(
  { result },
  ref,
) {
  const skill = skillById.get(result.mainSkill);
  const footer = shareTemplates.footers[0].text;

  return (
    <article ref={ref} className={`share-card share-card--${result.resultLevel}`}>
      <header className="share-card__header">
        <div>
          <h2>上帝掷骰子吗？</h2>
          <p>DOES GOD ROLL DICE?</p>
        </div>
        <span>OBSERVATION #{observationNumber(result.id)}</span>
      </header>

      <section className="share-card__question">
        <span>用户提交</span>
        <p>{result.question}</p>
      </section>

      <section className="share-card__check">
        <SkillPortrait skill={result.mainSkill} size="large" />
        <div>
          <p>[{skill?.name.toLocaleUpperCase() ?? result.mainSkill.toLocaleUpperCase()} CHECK]</p>
          <DiceRoller dice={result.dice} compact />
          <strong>
            {result.dice[0]} + {result.dice[1]} = {result.total}
          </strong>
          <em>{resultLevelLabels[result.resultLevel]}</em>
        </div>
      </section>

      <section className="share-card__voices">
        {result.skillLines.slice(0, 2).map((line) => (
          <div key={line.id}>
            <strong>{skillById.get(line.skill)?.name.toLocaleUpperCase()}</strong>
            <p>{line.text}</p>
          </div>
        ))}
      </section>

      <section className="share-card__verdict">
        <span>最终判定</span>
        <p>{result.verdict}</p>
      </section>

      <footer>{footer}</footer>
    </article>
  );
});
