import categoriesJson from "./categories.json";
import keywordsJson from "./keywords.json";
import loadingTextsJson from "./loading-texts.json";
import safetyResponsesJson from "./safety-responses.json";
import shareTemplatesJson from "./share-templates.json";
import skillLinesJson from "./skill-lines.json";
import skillsJson from "./skills.json";
import verdictsJson from "./verdicts.json";
import whispersJson from "./whispers.json";
import type {
  CategoryDefinition,
  ContentLine,
  KeywordGroup,
  ResultLevel,
  SkillDefinition,
  VerdictEntry,
  WhisperGroup,
} from "../types";

export const skills = skillsJson as unknown as SkillDefinition[];
export const categories = categoriesJson as unknown as CategoryDefinition[];
export const keywordGroups = keywordsJson as unknown as KeywordGroup[];
export const loadingTexts = loadingTextsJson as Array<{
  id: string;
  category: string;
  text: string;
}>;
export const whispers = whispersJson as unknown as WhisperGroup[];
export const skillLines = skillLinesJson as unknown as ContentLine[];
export const verdicts = verdictsJson as unknown as VerdictEntry[];
export const safetyResponses = safetyResponsesJson as Array<{
  id: string;
  skill: string;
  line: string;
  verdict: string;
}>;
export const shareTemplates = shareTemplatesJson;

export const skillById = new Map(skills.map((skill) => [skill.id, skill]));
export const categoryById = new Map(categories.map((category) => [category.id, category]));

export const resultLevelLabels: Record<ResultLevel, string> = {
  critical_failure: "大失败",
  failure: "失败",
  chaotic_success: "混沌成功",
  success: "成功",
  critical_success: "大成功",
};
