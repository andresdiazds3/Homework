type Props = {
    id: number;
    nombre: string;
    precio: number;
}

class Product {
    id: number;
    nombre: string;
    precio: number;

    constructor({id,nombre,precio}: Props){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

export default Product;