import { resultLevelLabels, skillById } from "../../data";
import type { AppState, CheckResult } from "../../types";
import { DiceRoller } from "../DiceRoller/DiceRoller";
import { ResultActions } from "../ResultActions/ResultActions";
import { SkillPortrait } from "../SkillPortrait/SkillPortrait";
import { SkillVoice } from "../SkillVoice/SkillVoice";
import { VerdictPanel } from "../VerdictPanel/VerdictPanel";

interface ResultSceneProps {
  result: CheckResult;
  state: Extract<AppState, "revealing" | "result">;
  revealStep: number;
  onRetry: () => void;
  onShuffle: () => void;
  onShare: () => void;
  onEdit: () => void;
}

export function ResultScene({
  result,
  state,
  revealStep,
  onRetry,
  onShuffle,
  onShare,
  onEdit,
}: ResultSceneProps) {
  const complete = state === "result";
  const showMath = complete || revealStep >= 1;
  const showLevel = complete || revealStep >= 2;
  const visibleLineCount = complete ? result.skillLines.length : Math.max(0, revealStep - 2);
  const showVerdict = complete || revealStep >= result.skillLines.length + 3;
  const mainSkill = skillById.get(result.mainSkill);

  return (
    <main className={`result-scene result-scene--${result.resultLevel}`}>
      <div className="result-scene__question">
        <span>用户提交 / OBSERVATION</span>
        <p>{result.question}</p>
      </div>

      <section className="check-summary" aria-live="polite">
        <div className="check-summary__portrait">
          <SkillPortrait skill={result.mainSkill} size="large" />
        </div>
        <div className="check-summary__copy">
          <div className="check-summary__identity">
            <p className="check-summary__label">主导技能 / DOMINANT FACULTY</p>
            <p className="check-summary__name">
              <strong>
                {mainSkill?.name.toLocaleUpperCase() ?? result.mainSkill.toLocaleUpperCase()}
              </strong>
              <span>{mainSkill?.nameZh ?? result.mainSkill}检定</span>
            </p>
          </div>
          <DiceRoller dice={result.dice} compact />
          {state === "revealing" && revealStep === 0 && (
            <p className="reaction-line">
              <strong>REACTION SPEED</strong>：它们停下了。
            </p>
          )}
          {showMath && (
            <p className="dice-math">
              {result.dice[0]} + {result.dice[1]} = {result.total}
            </p>
          )}
          {showLevel && (
            <p className="result-level">{resultLevelLabels[result.resultLevel]}</p>
          )}
          {showLevel && <small>观测完成。解释权已移交脑内。</small>}
        </div>
      </section>

      <section className="skill-voices" aria-label="脑内技能发言">
        {result.skillLines.slice(0, visibleLineCount).map((line, index) => (
          <SkillVoice line={line} index={index} key={line.id} />
        ))}
      </section>

      {showVerdict && <VerdictPanel result={result} />}
      {complete && (
        <ResultActions
          onRetry={onRetry}
          onShuffle={onShuffle}
          onShare={onShare}
          onEdit={onEdit}
        />
      )}
    </main>
  );
}
