type Props = {
    tipo: string;
    nombre: string;
}


export class Node {

    tipo: string;
    nombre: string;

    constructor({tipo, nombre}:Props){
        this.tipo = tipo;
        this.nombre = nombre;
    }

}