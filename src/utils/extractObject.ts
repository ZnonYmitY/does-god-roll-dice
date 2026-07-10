import { categoryById, keywordGroups } from "../data";
import type { CategoryId } from "../types";

function stableIndex(value: string, length: number): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash) % length;
}

function fallbackObject(question: string, category: CategoryId): string {
  const objects = categoryById.get(category)?.fallbackObjects ?? ["这件事"];
  return objects[stableIndex(question, objects.length)];
}

export function extractObject(question: string, category: CategoryId): string {
  const input = question.trim();
  const group = keywordGroups.find((item) => item.category === category);
  const matchedTerms = [...(group?.strong ?? []), ...(group?.action ?? [])]
    .filter((term) => input.toLocaleLowerCase("zh-CN").includes(term.toLocaleLowerCase("zh-CN")))
    .sort((a, b) => b.length - a.length);

  if (matchedTerms[0]) {
    return matchedTerms[0];
  }

  const simplified = input
    .replace(/[？?！!。,.，；;：:]/g, " ")
    .replace(/^(今晚|今天|明天|现在|我|我们|到底|所以)+/g, "")
    .replace(/(要不要|该不该|能不能|想不想|是不是|是否|我还要|我想要)/g, "")
    .replace(/(怎么办|怎么做|可以吗|行不行|吗|呢)$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (simplified.length >= 2 && simplified.length <= 18) {
    return simplified;
  }

  return fallbackObject(question, category);
}
