import "../styles/Controls.css"

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Controls({ onNext, onPrev}: Props) {
  return (
    <div className="controls">
      <button onClick={onPrev}>Anterior</button>
      <button onClick={onNext}>Siguiente</button>
    </div>
  );
}