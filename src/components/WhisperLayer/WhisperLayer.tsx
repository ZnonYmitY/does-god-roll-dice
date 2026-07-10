import { skillById } from "../../data";
import { useWhisperRotation } from "../../hooks/useWhisperRotation";

interface WhisperLayerProps {
  active: boolean;
}

export function WhisperLayer({ active }: WhisperLayerProps) {
  const whisper = useWhisperRotation(active);

  return (
    <aside className="whisper-layer" aria-live="polite" aria-label="脑内低语">
      <div className="whisper-layer__group" key={whisper.id}>
        {whisper.lines.map((line) => (
          <p key={`${whisper.id}-${line.skill}`}>
            <strong>{skillById.get(line.skill)?.name.toLocaleUpperCase() ?? line.skill}</strong>
            <span>{line.text}</span>
          </p>
        ))}
      </div>
    </aside>
  );
}
