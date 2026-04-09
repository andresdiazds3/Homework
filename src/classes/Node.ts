type NodeProps = {
    valor: any;
    izquierda?: Node | null;
    derecha?: Node | null;
};

export class Node {
    valor: any;
    izquierda: Node | null;
    derecha: Node | null;

    constructor({ valor, izquierda = null, derecha = null }: NodeProps) {
        this.valor = valor;
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    isLead(){
        if (this.izquierda === null && this.derecha === null){
            return true;
        } else {
            return false;
        }
    }
}