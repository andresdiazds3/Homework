import { useMemo, useState } from 'react';
import { type RawNodeDatum } from 'react-d3-tree';
import { ArbolBinario } from '../classes/BinaryTree';
import { Node } from '../classes/Node';
import { type NodoData } from '../data/arbolData';

export type TipoRecorrido = 'preorden' | 'inorder' | 'postorder';

const construirNodoDesdeData = (nodoData: NodoData | null): Node | null => {
  if (!nodoData) {
    return null;
  }

  return new Node({
    valor: nodoData.valor,
    izquierda: construirNodoDesdeData(nodoData.izquierda),
    derecha: construirNodoDesdeData(nodoData.derecha),
  });
};

const convertirNodoAFormatoD3 = (nodo: Node | null): RawNodeDatum | null => {
  if (!nodo) {
    return null;
  }

  const nodoIzquierdo = convertirNodoAFormatoD3(nodo.izquierda);
  const nodoDerecho = convertirNodoAFormatoD3(nodo.derecha);
  const hijos = [nodoIzquierdo, nodoDerecho].filter((hijo): hijo is RawNodeDatum => hijo !== null);

  return {
    name: String(nodo.valor),
    children: hijos.length > 0 ? hijos : undefined,
  };
};

export const useBinaryTreeD3 = (dataInicial: NodoData) => {
  const arbolBinario = useMemo(() => {
    const raizDesdeData = construirNodoDesdeData(dataInicial);
    return new ArbolBinario({ raiz: raizDesdeData });
  }, [dataInicial]);

  const [, setVersionRenderDummy] = useState(0);
  const [valorAInsertar, setValorAInsertar] = useState('');
  const [errorInsercion, setErrorInsercion] = useState('');

  const insertarConReglaArbolBinarioBusqueda = () => {
    const valorConvertido = Number(valorAInsertar);
    if (!Number.isInteger(valorConvertido)) {
      setErrorInsercion('Ingresa un numero entero valido.');
      return;
    }

    arbolBinario.insertar(valorConvertido);
    setErrorInsercion('');
    setValorAInsertar('');
    setVersionRenderDummy((versionAnterior) => versionAnterior + 1);
  };

  const obtenerRecorrido = (tipo: TipoRecorrido) => {
    switch (tipo) {
      case 'preorden':
        return arbolBinario.preorden();
      case 'inorder':
        return arbolBinario.inorder();
      case 'postorder':
        return arbolBinario.postorder();
      default:
        return [];
    }
  };

  const raizTransformada = convertirNodoAFormatoD3(arbolBinario.raiz);
  const datosArbolVisual = raizTransformada ? [raizTransformada] : [];

  return {
    datosArbolVisual,
    valorAInsertar,
    setValorAInsertar,
    errorInsercion,
    insertarConReglaArbolBinarioBusqueda,
    obtenerRecorrido,
  };
};
