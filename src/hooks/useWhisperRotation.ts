import { useEffect, useState } from "react";
import { whispers } from "../data";
import type { WhisperGroup } from "../types";
import { randomInt } from "../utils/random";

export function useWhisperRotation(active: boolean): WhisperGroup {
  const [index, setIndex] = useState(() => randomInt(0, whispers.length - 1));

  useEffect(() => {
    if (!active) return;
    const timeout = window.setTimeout(
      () => setIndex((current) => (current + 1) % whispers.length),
      randomInt(6000, 10000),
    );
    return () => window.clearTimeout(timeout);
  }, [active, index]);

  return whispers[index];
}
