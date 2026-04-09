import { Node, type NodeValue } from "./Node";

type Props = {
    raiz?: Node | null;
};

export class ArbolBinario {
    raiz: Node | null;

    constructor({ raiz = null }: Props = {}) {
        this.raiz = raiz;
    }

    insertar(valor: NodeValue) {
        const nuevoNodo = new Node({ valor });
        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return nuevoNodo;
        }

        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    return nuevoNodo;
                }
                actual = actual.izquierda;
            } else {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    return nuevoNodo;
                }
                actual = actual.derecha;
            }
        }
    }
}