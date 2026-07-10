export type AppState = "idle" | "rolling" | "revealing" | "result";

export type CategoryId =
  | "food"
  | "social"
  | "work_study"
  | "shopping"
  | "rest"
  | "creation"
  | "life"
  | "absurd"
  | "unknown";

export type ResultLevel =
  | "critical_failure"
  | "failure"
  | "chaotic_success"
  | "success"
  | "critical_success";

export type SkillAttribute = "intellect" | "psyche" | "physique" | "motorics";
export type SkillRole = "main" | "opposing" | "atmosphere";

export interface SkillDefinition {
  id: string;
  name: string;
  nameZh: string;
  attribute: SkillAttribute;
  description: string;
}

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  fallbackObjects: string[];
  mainSkills: string[];
  opposingSkills: string[];
  atmosphereSkills: string[];
}

export interface KeywordGroup {
  category: Exclude<CategoryId, "unknown">;
  strong: string[];
  action: string[];
}

export interface ContentLine {
  id: string;
  skill: string;
  categories: Array<CategoryId | "all">;
  resultLevels: Array<ResultLevel | "all">;
  template: string;
  weight: number;
  rare: boolean;
  requiresObject: boolean;
}

export interface VerdictEntry {
  id: string;
  categories: Array<CategoryId | "all">;
  resultLevels: ResultLevel[];
  template: string;
  weight: number;
}

export interface ResolvedSkillLine {
  id: string;
  skill: string;
  role: SkillRole;
  text: string;
}

export interface CheckResult {
  id: string;
  question: string;
  normalizedQuestion: string;
  category: CategoryId;
  object: string;
  dice: [number, number];
  total: number;
  resultLevel: ResultLevel;
  mainSkill: string;
  skillLines: ResolvedSkillLine[];
  verdictId: string;
  verdict: string;
  createdAt: string;
  sensitive: boolean;
}

export interface CheckHistoryItem {
  id: string;
  question: string;
  normalizedQuestion: string;
  category: CategoryId;
  object: string;
  dice: [number, number];
  total: number;
  resultLevel: ResultLevel;
  mainSkill: string;
  skillLineIds: string[];
  verdictId: string;
  createdAt: string;
  sensitive: boolean;
}

export interface WhisperGroup {
  id: string;
  lines: Array<{ skill: string; text: string }>;
}
