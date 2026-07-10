import { useCallback, useState } from "react";
import type { CheckHistoryItem, CheckResult } from "../types";
import {
  clearStoredHistory,
  readHistory,
  upsertHistory,
  writeHistory,
} from "../utils/storage";
import { toHistoryItem } from "../utils/checkEngine";

export function useHistory() {
  const [history, setHistory] = useState<CheckHistoryItem[]>(readHistory);

  const saveResult = useCallback((result: CheckResult) => {
    setHistory((current) => {
      const next = upsertHistory(current, toHistoryItem(result));
      writeHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    clearStoredHistory();
    setHistory([]);
  }, []);

  return { history, saveResult, clearHistory };
}
