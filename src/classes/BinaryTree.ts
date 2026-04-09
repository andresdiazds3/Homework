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


    preorden(node: Node | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        resultado.push(node.valor);
        this.preorden(node.izquierda, resultado);
        this.preorden(node.derecha, resultado);
        return resultado;
    }

    inorder(node: Node | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        this.inorder(node.izquierda, resultado);
        resultado.push(node.valor);
        this.inorder(node.derecha, resultado);
        return resultado;
    }

    postorder(node: Node | null = this.raiz, resultado: NodeValue[] = []): NodeValue[] {
        if (!node) return resultado;
        this.postorder(node.izquierda, resultado);
        this.postorder(node.derecha, resultado);
        resultado.push(node.valor);
        return resultado;
    }
}