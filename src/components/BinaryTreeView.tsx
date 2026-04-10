import { useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { arbol } from '../data/arbolData';
import { useBinaryTreeD3 } from '../hooks/useBinaryTreeD3';
import { useElementSize } from '../hooks/useElementSize';
import '../styles/BinaryTree.css';

type TipoRecorrido = 'preorden' | 'inorder' | 'postorder';

const NOMBRE_RECORRIDO: Record<TipoRecorrido, string> = {
  preorden: 'Preorden',
  inorder: 'Inorder',
  postorder: 'Postorder',
};

export default function PanelArbolBinario() {
  const contenedorArbolRef = useRef<HTMLDivElement | null>(null);
  const tamanoContenedor = useElementSize(contenedorArbolRef);
  const [tipoRecorrido, setTipoRecorrido] = useState<TipoRecorrido>('preorden');
  const [resultadoRecorrido, setResultadoRecorrido] = useState<number[] | null>(null);
  const {
    datosArbolVisual,
    valorAInsertar,
    setValorAInsertar,
    errorInsercion,
    insertarConReglaArbolBinarioBusqueda,
    obtenerRecorrido,
  } = useBinaryTreeD3(arbol);

  const imprimirRecorrido = () => {
    const resultado = obtenerRecorrido(tipoRecorrido);
    setResultadoRecorrido(resultado);
  };

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

      <div className="tree-traversal-controls">
        <label htmlFor="tipo-recorrido">Tipo de recorrido</label>
        <select
          id="tipo-recorrido"
          value={tipoRecorrido}
          onChange={(evento) => setTipoRecorrido(evento.target.value as TipoRecorrido)}
        >
          <option value="preorden">Preorden</option>
          <option value="inorder">Inorder</option>
          <option value="postorder">Postorder</option>
        </select>
        <button type="button" onClick={imprimirRecorrido}>
          Imprimir recorrido
        </button>
      </div>

      {resultadoRecorrido ? (
        <p className="tree-traversal-result">
          {NOMBRE_RECORRIDO[tipoRecorrido]}: {resultadoRecorrido.length > 0 ? resultadoRecorrido.join(' -> ') : 'Arbol vacio'}
        </p>
      ) : null}

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
