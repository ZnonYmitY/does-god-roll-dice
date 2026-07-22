import { useState, type FormEvent } from "react";
import { assets } from "../../config/assets";

const MAX_LENGTH = 120;

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  error?: string;
}

export function QuestionInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  error,
}: QuestionInputProps) {
  const [loadedButtonImages, setLoadedButtonImages] = useState<
    Record<"default" | "hover" | "pressed" | "loading", boolean>
  >({ default: false, hover: false, pressed: false, loading: false });
  const buttonImagesReady = Object.values(loadedButtonImages).every(Boolean);
  const buttonLabel = disabled ? "正在检定……" : "掷骰检定";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <label className="question-label" htmlFor="question-input">
        向混沌提出一个问题：
      </label>
      <div className={`question-frame ${value ? "question-frame--filled" : ""}`}>
        <textarea
          id="question-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={MAX_LENGTH}
          rows={4}
          placeholder="向混沌提出一个问题……"
          disabled={disabled}
          aria-describedby="question-counter question-error"
          aria-invalid={Boolean(error)}
        />
        <span id="question-counter" className="question-counter">
          INPUT {String(value.length).padStart(3, "0")} / {MAX_LENGTH}
        </span>
      </div>
      <div className="question-form__status" aria-live="polite">
        {error ? (
          <span id="question-error" className="question-error">
            {error}
          </span>
        ) : value.length >= MAX_LENGTH ? (
          <span id="question-error">已达到 120 字上限。</span>
        ) : (
          <span id="question-error">{value ? "状态未决" : "等待精神噪声"}</span>
        )}
      </div>
      <button
        className={`primary-button roll-button${buttonImagesReady ? " roll-button--ready" : ""}${disabled ? " roll-button--loading" : ""}`}
        type="submit"
        disabled={disabled || value.trim().length === 0}
        aria-label={buttonLabel}
      >
        <span className="roll-button__fallback">{buttonLabel}</span>
        {(["default", "hover", "pressed", "loading"] as const).map((state) => (
          <img
            className={`roll-button__image roll-button__image--${state}`}
            src={assets.buttons.roll[state]}
            alt=""
            aria-hidden="true"
            draggable="false"
            onLoad={() =>
              setLoadedButtonImages((current) => ({ ...current, [state]: true }))
            }
            onError={(event) => {
              event.currentTarget.hidden = true;
              setLoadedButtonImages((current) => ({ ...current, [state]: false }));
            }}
            key={state}
          />
        ))}
      </button>
      <p className="dice-disclaimer">
        两枚骰子对此表示愿意负责，但它们不会解释结果。
      </p>
    </form>
  );
}
