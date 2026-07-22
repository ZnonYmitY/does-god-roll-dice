import { useState } from "react";
import { assets } from "../../config/assets";
import { AssetIcon } from "../AssetIcon/AssetIcon";

interface ResultActionsProps {
  onRetry: () => void;
  onShuffle: () => void;
  onShare: () => void;
  onEdit: () => void;
}

const actions = [
  {
    id: "retry",
    label: "再检定一次",
    icon: assets.icons.retry,
    fallback: "↻",
    images: assets.buttons.resultActions.retry,
  },
  {
    id: "shuffle",
    label: "换一批技能发言",
    icon: assets.icons.shuffle,
    fallback: "⇄",
    images: assets.buttons.resultActions.shuffle,
  },
  {
    id: "share",
    label: "生成分享图",
    icon: assets.icons.share,
    fallback: "·",
    images: assets.buttons.resultActions.share,
  },
  {
    id: "edit",
    label: "修改问题",
    icon: assets.icons.back,
    fallback: "←",
  },
] as const;

type ImageAction = (typeof actions)[number] & { images: Record<"default" | "hover" | "pressed", string> };

function ImageActionButton({ action, onClick }: { action: ImageAction; onClick: () => void }) {
  const [loadedImages, setLoadedImages] = useState<Record<"default" | "hover" | "pressed", boolean>>({
    default: false,
    hover: false,
    pressed: false,
  });
  const imageReady = Object.values(loadedImages).every(Boolean);

  return (
    <button
      className={`result-action-button${imageReady ? " result-action-button--ready" : ""}`}
      type="button"
      onClick={onClick}
      aria-label={action.label}
    >
      <span className="result-action-button__fallback" aria-hidden="true">
        <AssetIcon src={action.icon} fallback={action.fallback} />
        <span>{action.label}</span>
      </span>
      {(["default", "hover", "pressed"] as const).map((state) => (
        <img
          className={`result-action-button__image result-action-button__image--${state}`}
          src={action.images[state]}
          alt=""
          aria-hidden="true"
          draggable="false"
          onLoad={() => setLoadedImages((current) => ({ ...current, [state]: true }))}
          onError={(event) => {
            event.currentTarget.hidden = true;
            setLoadedImages((current) => ({ ...current, [state]: false }));
          }}
          key={state}
        />
      ))}
    </button>
  );
}

export function ResultActions({ onRetry, onShuffle, onShare, onEdit }: ResultActionsProps) {
  const handlers = { retry: onRetry, shuffle: onShuffle, share: onShare, edit: onEdit };
  return (
    <div className="result-actions" aria-label="结果操作">
      {actions.map((action) =>
        "images" in action ? (
          <ImageActionButton action={action} onClick={handlers[action.id]} key={action.id} />
        ) : (
          <button className="secondary-button result-action-button--text" type="button" onClick={handlers[action.id]} key={action.id}>
            <AssetIcon src={action.icon} fallback={action.fallback} />
            <span>{action.label}</span>
          </button>
        ),
      )}
    </div>
  );
}
