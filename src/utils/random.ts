export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickOne<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty collection.");
  }

  return items[randomInt(0, items.length - 1)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function pickWeighted<T extends { weight: number }>(items: readonly T[]): T {
  const totalWeight = items.reduce((total, item) => total + Math.max(item.weight, 0), 0);
  if (totalWeight <= 0) {
    return pickOne(items);
  }

  let cursor = Math.random() * totalWeight;
  for (const item of items) {
    cursor -= Math.max(item.weight, 0);
    if (cursor <= 0) {
      return item;
    }
  }

  return items[items.length - 1];
}
