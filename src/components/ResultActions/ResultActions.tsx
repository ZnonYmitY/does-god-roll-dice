import { assets } from "../../config/assets";
import { AssetIcon } from "../AssetIcon/AssetIcon";

interface ResultActionsProps {
  onRetry: () => void;
  onShuffle: () => void;
  onShare: () => void;
  onEdit: () => void;
}

const actions = [
  ["retry", "再检定一次", assets.icons.retry, "↻"],
  ["shuffle", "换一批技能发言", assets.icons.shuffle, "⇄"],
  ["share", "生成分享图", assets.icons.share, "·"],
  ["edit", "修改问题", assets.icons.back, "←"],
] as const;

export function ResultActions({ onRetry, onShuffle, onShare, onEdit }: ResultActionsProps) {
  const handlers = { retry: onRetry, shuffle: onShuffle, share: onShare, edit: onEdit };
  return (
    <div className="result-actions" aria-label="结果操作">
      {actions.map(([id, label, icon, fallback]) => (
        <button className="secondary-button" type="button" onClick={handlers[id]} key={id}>
          <AssetIcon src={icon} fallback={fallback} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
