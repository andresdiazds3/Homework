import { useRef } from 'react';
import Tree from 'react-d3-tree';
import { arbol } from '../data/arbolData';
import { useBinaryTreeD3 } from '../hooks/useBinaryTreeD3';
import { useElementSize } from '../hooks/useElementSize';
import '../styles/BinaryTree.css';

export default function PanelArbolBinario() {
  const contenedorArbolRef = useRef<HTMLDivElement | null>(null);
  const tamanoContenedor = useElementSize(contenedorArbolRef);
  const {
    datosArbolVisual,
    valorAInsertar,
    setValorAInsertar,
    errorInsercion,
    insertarConReglaArbolBinarioBusqueda,
  } = useBinaryTreeD3(arbol);

  return (
    <section className="binary-tree-view">
      <header className="tree-header">
        <h1>Arbol Binario</h1>
        <div className="tree-controls">
          <input
            type="number"
            value={valorAInsertar}
            onChange={(evento) => setValorAInsertar(evento.target.value)}
            placeholder="Valor"
            aria-label="Valor del nodo"
          />
          <button type="button" onClick={insertarConReglaArbolBinarioBusqueda}>
            Insertar
          </button>
        </div>
      </header>

      {errorInsercion ? <p className="tree-error">{errorInsercion}</p> : null}

      <div className="tree-canvas" ref={contenedorArbolRef}>
        {datosArbolVisual.length > 0 && tamanoContenedor.width > 0 ? (
          <Tree
            data={datosArbolVisual}
            translate={{ x: tamanoContenedor.width / 2, y: 90 }}
            orientation="vertical"
            pathFunc="step"
            collapsible={false}
            separation={{ siblings: 1.25, nonSiblings: 1.35 }}
            nodeSize={{ x: 180, y: 110 }}
            zoomable
          />
        ) : null}
      </div>
    </section>
  );
}
