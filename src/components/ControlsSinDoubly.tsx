import "../styles/Controls.css"

type Props = {
  onNext: () => void;
};

export default function ControlsSinDoubly({ onNext}: Props) {
  return (
    <div className="controls">
      <button onClick={onNext}>Siguiente</button>
    </div>
  );
}