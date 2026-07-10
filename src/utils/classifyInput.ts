import { keywordGroups } from "../data";
import type { CategoryId } from "../types";

const sensitiveTerms = [
  "自杀",
  "轻生",
  "不想活",
  "伤害自己",
  "伤害别人",
  "家暴",
  "急救",
  "报警",
  "诊断",
  "处方",
  "服药",
  "律师",
  "诉讼",
  "违法",
  "股票",
  "投资",
  "借贷",
];

export function normalizeQuestion(question: string): string {
  return question.trim().replace(/\s+/g, " ").toLocaleLowerCase("zh-CN");
}

export function classifyInput(question: string): CategoryId {
  const input = normalizeQuestion(question);
  const scores = new Map<CategoryId, number>();

  keywordGroups.forEach((group) => {
    let score = 0;
    group.strong.forEach((term) => {
      if (input.includes(term.toLocaleLowerCase("zh-CN"))) {
        score += 3 + Math.min(term.length, 4) * 0.1;
      }
    });
    group.action.forEach((term) => {
      if (input.includes(term.toLocaleLowerCase("zh-CN"))) {
        score += 1;
      }
    });
    scores.set(group.category, score);
  });

  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  return ranked[0]?.[1] > 0 ? ranked[0][0] : "unknown";
}

export function isSensitiveInput(question: string): boolean {
  const input = normalizeQuestion(question);
  return sensitiveTerms.some((term) => input.includes(term));
}
