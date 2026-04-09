import { Node } from '../classes/Node';

type TreeNodeProps = {
  nodoActual: Node | null;
};

export default function NodoArbolRecursivo({ nodoActual }: TreeNodeProps) {
  if (!nodoActual) {
    return <div className="tree-empty">null</div>;
  }

  return (
    <div className="tree-node-wrapper">
      <div className="tree-node-card">
        <strong>{nodoActual.valor}</strong>
      </div>

      <div className="tree-children">
        <NodoArbolRecursivo nodoActual={nodoActual.izquierda} />
        <NodoArbolRecursivo nodoActual={nodoActual.derecha} />
      </div>
    </div>
  );
}
