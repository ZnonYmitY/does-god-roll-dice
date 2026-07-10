import {
  categoryById,
  safetyResponses,
  skillLines,
  verdicts,
} from "../data";
import type {
  CategoryDefinition,
  CategoryId,
  CheckHistoryItem,
  CheckResult,
  ContentLine,
  ResolvedSkillLine,
  ResultLevel,
  SkillRole,
  VerdictEntry,
} from "../types";
import { classifyInput, isSensitiveInput, normalizeQuestion } from "./classifyInput";
import { extractObject } from "./extractObject";
import { pickOne, pickWeighted, randomInt, shuffle } from "./random";
import { getResultLevel, rollDice } from "./rollDice";

interface GenerateOptions {
  dice?: [number, number];
  preserveMainSkill?: string;
  id?: string;
  createdAt?: string;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `check-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function applyTemplate(template: string, object: string): string {
  return template.replaceAll("{object}", object);
}

function isMatch<T extends string>(values: readonly T[], value: string): boolean {
  return values.includes(value as T) || values.includes("all" as T);
}

function skillComboFromHistory(item: CheckHistoryItem): string {
  return item.skillLineIds
    .map((lineId) => skillLines.find((line) => line.id === lineId)?.skill)
    .filter((skill): skill is string => Boolean(skill))
    .sort()
    .join("|");
}

function chooseMainSkill(category: CategoryDefinition, level: ResultLevel): string {
  if (level === "critical_failure" || level === "failure") {
    return Math.random() < 0.7
      ? pickOne(category.opposingSkills)
      : pickOne(category.mainSkills);
  }

  if (level === "chaotic_success") {
    return pickOne([...category.mainSkills, ...category.opposingSkills]);
  }

  return Math.random() < 0.85
    ? pickOne(category.mainSkills)
    : pickOne(category.atmosphereSkills);
}

function buildSkillSelection(
  category: CategoryDefinition,
  level: ResultLevel,
  mainSkill: string | undefined,
): Array<{ skill: string; role: SkillRole }> {
  const selectedMain = mainSkill ?? chooseMainSkill(category, level);
  const mainIsCategoryLead = category.mainSkills.includes(selectedMain);
  const opposingPool = mainIsCategoryLead ? category.opposingSkills : category.mainSkills;
  const selected: Array<{ skill: string; role: SkillRole }> = [
    { skill: selectedMain, role: "main" },
  ];

  const opponent = shuffle(opposingPool).find((skill) => skill !== selectedMain);
  if (opponent) selected.push({ skill: opponent, role: "opposing" });

  const targetCount = randomInt(2, 4);
  const extras = shuffle([
    ...category.atmosphereSkills,
    ...category.opposingSkills,
    ...category.mainSkills,
  ]).filter((skill) => !selected.some((item) => item.skill === skill));

  while (selected.length < targetCount && extras.length > 0) {
    selected.push({ skill: extras.shift()!, role: "atmosphere" });
  }

  return selected;
}

function selectSkills(
  category: CategoryDefinition,
  level: ResultLevel,
  history: CheckHistoryItem[],
  mainSkill?: string,
): Array<{ skill: string; role: SkillRole }> {
  const recentCombos = new Set(history.slice(0, 5).map(skillComboFromHistory));
  let candidate = buildSkillSelection(category, level, mainSkill);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const combo = candidate.map((item) => item.skill).sort().join("|");
    if (!recentCombos.has(combo)) return candidate;
    candidate = buildSkillSelection(category, level, mainSkill);
  }

  return candidate;
}

function selectLine(
  skill: string,
  category: CategoryId,
  level: ResultLevel,
  excludedIds: Set<string>,
): ContentLine {
  const matching = skillLines.filter(
    (line) =>
      line.skill === skill &&
      isMatch(line.categories, category) &&
      isMatch(line.resultLevels, level),
  );
  const fallback = matching.length > 0 ? matching : skillLines.filter((line) => line.skill === skill);
  const unused = fallback.filter((line) => !excludedIds.has(line.id));
  return pickWeighted(unused.length > 0 ? unused : fallback);
}

function resolveSkillLines(
  selection: Array<{ skill: string; role: SkillRole }>,
  category: CategoryId,
  level: ResultLevel,
  object: string,
  history: CheckHistoryItem[],
  normalizedQuestion: string,
): ResolvedSkillLine[] {
  const sameQuestionIds = history
    .filter((item) => item.normalizedQuestion === normalizedQuestion)
    .flatMap((item) => item.skillLineIds);
  const excludedIds = new Set(sameQuestionIds);

  return selection.map(({ skill, role }) => {
    const line = selectLine(skill, category, level, excludedIds);
    excludedIds.add(line.id);
    return {
      id: line.id,
      skill,
      role,
      text: applyTemplate(line.template, object),
    };
  });
}

function selectVerdict(
  category: CategoryId,
  level: ResultLevel,
  object: string,
  history: CheckHistoryItem[],
): { id: string; text: string } {
  const candidates = verdicts.filter(
    (verdict) =>
      isMatch(verdict.categories, category) && verdict.resultLevels.includes(level),
  );
  const recentIds = new Set(history.slice(0, 3).map((item) => item.verdictId));
  const unused = candidates.filter((verdict) => !recentIds.has(verdict.id));
  const verdict: VerdictEntry = pickWeighted(unused.length > 0 ? unused : candidates);
  return { id: verdict.id, text: applyTemplate(verdict.template, object) };
}

function buildSensitiveResult(
  base: Omit<CheckResult, "mainSkill" | "skillLines" | "verdictId" | "verdict">,
): CheckResult {
  const response = safetyResponses[0];
  const logicLine = skillLines.find((line) => line.id === "logic_003")!;
  return {
    ...base,
    mainSkill: "volition",
    skillLines: [
      { id: response.id, skill: "volition", role: "main", text: response.line },
      {
        id: logicLine.id,
        skill: logicLine.skill,
        role: "opposing",
        text: applyTemplate(logicLine.template, base.object),
      },
    ],
    verdictId: response.id,
    verdict: response.verdict,
  };
}

export function generateCheck(
  question: string,
  history: CheckHistoryItem[],
  options: GenerateOptions = {},
): CheckResult {
  const normalizedQuestion = normalizeQuestion(question);
  const category = classifyInput(question);
  const object = extractObject(question, category);
  const dice = options.dice ?? rollDice();
  const resultLevel = getResultLevel(dice);
  const sensitive = isSensitiveInput(question);
  const base = {
    id: options.id ?? createId(),
    question: question.trim(),
    normalizedQuestion,
    category,
    object,
    dice,
    total: dice[0] + dice[1],
    resultLevel,
    createdAt: options.createdAt ?? new Date().toISOString(),
    sensitive,
  };

  if (sensitive) return buildSensitiveResult(base);

  const categoryDefinition = categoryById.get(category) ?? categoryById.get("unknown")!;
  const skillSelection = selectSkills(
    categoryDefinition,
    resultLevel,
    history,
    options.preserveMainSkill,
  );
  const skillLinesResolved = resolveSkillLines(
    skillSelection,
    category,
    resultLevel,
    object,
    history,
    normalizedQuestion,
  );
  const verdict = selectVerdict(category, resultLevel, object, history);

  return {
    ...base,
    mainSkill: skillSelection[0].skill,
    skillLines: skillLinesResolved,
    verdictId: verdict.id,
    verdict: verdict.text,
  };
}

export function reshuffleCheck(
  current: CheckResult,
  history: CheckHistoryItem[],
): CheckResult {
  return generateCheck(current.question, history, {
    dice: current.dice,
    preserveMainSkill: current.mainSkill,
    id: current.id,
    createdAt: current.createdAt,
  });
}

export function toHistoryItem(result: CheckResult): CheckHistoryItem {
  return {
    id: result.id,
    question: result.question,
    normalizedQuestion: result.normalizedQuestion,
    category: result.category,
    object: result.object,
    dice: result.dice,
    total: result.total,
    resultLevel: result.resultLevel,
    mainSkill: result.mainSkill,
    skillLineIds: result.skillLines.map((line) => line.id),
    verdictId: result.verdictId,
    createdAt: result.createdAt,
    sensitive: result.sensitive,
  };
}

export function restoreHistoryItem(item: CheckHistoryItem): CheckResult | null {
  const safety = safetyResponses.find((response) => response.id === item.verdictId);
  const verdict = safety ?? verdicts.find((entry) => entry.id === item.verdictId);
  if (!verdict) return null;

  const resolvedLines = item.skillLineIds
    .map((lineId, index): ResolvedSkillLine | null => {
      const safetyLine = safetyResponses.find((entry) => entry.id === lineId);
      if (safetyLine) {
        return { id: lineId, skill: safetyLine.skill, role: "main", text: safetyLine.line };
      }

      const line = skillLines.find((entry) => entry.id === lineId);
      if (!line) return null;
      return {
        id: line.id,
        skill: line.skill,
        role: line.skill === item.mainSkill ? "main" : index === 1 ? "opposing" : "atmosphere",
        text: applyTemplate(line.template, item.object),
      };
    })
    .filter((line): line is ResolvedSkillLine => Boolean(line));

  if (resolvedLines.length < 2) return null;

  return {
    id: item.id,
    question: item.question,
    normalizedQuestion: item.normalizedQuestion,
    category: item.category,
    object: item.object,
    dice: item.dice,
    total: item.total,
    resultLevel: item.resultLevel,
    mainSkill: item.mainSkill,
    skillLines: resolvedLines,
    verdictId: item.verdictId,
    verdict: safety ? safety.verdict : applyTemplate((verdict as VerdictEntry).template, item.object),
    createdAt: item.createdAt,
    sensitive: item.sensitive,
  };
}
