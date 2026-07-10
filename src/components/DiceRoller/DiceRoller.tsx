import { useEffect, useState } from "react";
import { assets } from "../../config/assets";

const pipMap: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

interface DiceFaceProps {
  value: number;
  variant: "ivory" | "red";
}

function DiceFace({ value, variant }: DiceFaceProps) {
  const src = assets.dice[variant](value);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => setImageFailed(false), [src]);

  return (
    <div className={`die die--${variant}`} aria-label={`${value} 点`}>
      {!imageFailed && (
        <img src={src} alt="" aria-hidden="true" onError={() => setImageFailed(true)} />
      )}
      {imageFailed && (
        <span className="die__fallback" aria-hidden="true">
          {pipMap[value].map((position) => (
            <i className={`pip pip--${position}`} key={position} />
          ))}
        </span>
      )}
    </div>
  );
}

interface DiceRollerProps {
  dice?: [number, number];
  rolling?: boolean;
  compact?: boolean;
}

export function DiceRoller({ dice = [3, 5], rolling = false, compact = false }: DiceRollerProps) {
  return (
    <div
      className={`dice-roller ${rolling ? "dice-roller--rolling" : ""} ${compact ? "dice-roller--compact" : ""}`}
      aria-label={`两枚六面骰：${dice[0]} 点和 ${dice[1]} 点`}
    >
      <DiceFace value={dice[0]} variant="ivory" />
      <DiceFace value={dice[1]} variant="red" />
    </div>
  );
}
