import { useEffect, useState, type RefObject } from 'react';

type ElementSize = {
  width: number;
  height: number;
};

export const useElementSize = (elementRef: RefObject<HTMLDivElement | null>): ElementSize => {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const elementoContenedor = elementRef.current;
    if (!elementoContenedor) return;

    const actualizarTamano = () => {
      setSize({
        width: elementoContenedor.clientWidth,
        height: elementoContenedor.clientHeight,
      });
    };

    actualizarTamano();
    const observador = new ResizeObserver(actualizarTamano);
    observador.observe(elementoContenedor);

    return () => observador.disconnect();
  }, [elementRef]);

  return size;
};
