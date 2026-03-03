type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function ButtonsDoubly({ onNext, onPrev }: Props) {
  return (
    <div className="controls">
      <button onClick={onNext}>Siguiente</button>
      <button onClick={onPrev}>Anterior</button>
    </div>
  );
}