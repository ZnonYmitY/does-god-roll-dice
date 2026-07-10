import { DiceRoller } from "../DiceRoller/DiceRoller";

interface RollStatusProps {
  text: string;
  detail: string;
  dice: [number, number];
}

export function RollStatus({ text, detail, dice }: RollStatusProps) {
  return (
    <section className="roll-status" aria-live="assertive" aria-busy="true">
      <p className="roll-status__eyebrow">CURRENT STATE: UNDECIDED</p>
      <h2>{text}</h2>
      <p className="roll-status__detail">{detail}</p>
      <DiceRoller dice={dice} rolling />
      <div className="skill-flashes" aria-hidden="true">
        <span>LOGIC</span>
        <span>VOLITION</span>
        <span>ELECTROCHEMISTRY</span>
      </div>
    </section>
  );
}
