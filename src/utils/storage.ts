import type { CheckHistoryItem } from "../types";

const HISTORY_KEY = "does-god-roll-dice:history:v1";
const HISTORY_LIMIT = 20;

function isHistoryItem(value: unknown): value is CheckHistoryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CheckHistoryItem>;
  return (
    typeof item.id === "string" &&
    typeof item.question === "string" &&
    Array.isArray(item.dice) &&
    item.dice.length === 2 &&
    Array.isArray(item.skillLineIds) &&
    typeof item.verdictId === "string"
  );
}

export function readHistory(): CheckHistoryItem[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isHistoryItem).slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
}

export function writeHistory(items: CheckHistoryItem[]): boolean {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_LIMIT)));
    return true;
  } catch {
    return false;
  }
}

export function upsertHistory(
  items: CheckHistoryItem[],
  nextItem: CheckHistoryItem,
): CheckHistoryItem[] {
  return [nextItem, ...items.filter((item) => item.id !== nextItem.id)].slice(0, HISTORY_LIMIT);
}

export function clearStoredHistory(): boolean {
  try {
    window.localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch {
    return false;
  }
}
