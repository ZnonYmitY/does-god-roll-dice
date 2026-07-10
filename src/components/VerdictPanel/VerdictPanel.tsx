import { resultLevelLabels, skillById } from "../../data";
import type { CheckResult } from "../../types";

interface VerdictPanelProps {
  result: CheckResult;
}

export function VerdictPanel({ result }: VerdictPanelProps) {
  const skill = skillById.get(result.mainSkill);
  return (
    <section className="verdict-panel" aria-label="最终判定">
      <p className="verdict-panel__label">最终判定</p>
      <h3>
        {skill?.name.toLocaleUpperCase() ?? result.mainSkill.toLocaleUpperCase()}：
        {resultLevelLabels[result.resultLevel]}
      </h3>
      <p>{result.verdict}</p>
    </section>
  );
}
