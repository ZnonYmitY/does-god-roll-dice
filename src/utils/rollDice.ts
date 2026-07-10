import type { ResultLevel } from "../types";
import { randomInt } from "./random";

export function getResultLevel(dice: [number, number]): ResultLevel {
  const [diceA, diceB] = dice;
  if (diceA === 1 && diceB === 1) return "critical_failure";
  if (diceA === 6 && diceB === 6) return "critical_success";

  const total = diceA + diceB;
  if (total <= 5) return "failure";
  if (total <= 8) return "chaotic_success";
  return "success";
}

export function rollDice(): [number, number] {
  return [randomInt(1, 6), randomInt(1, 6)];
}
