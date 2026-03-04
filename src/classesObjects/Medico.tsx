type Props = {
    id: number;
    nombre: string;
    rol: string;
}

class Medico {
    id: number;
    nombre: string;
    rol: string;

    constructor({id,nombre,rol}: Props){
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
    }
}

export default Medico;