type Props = {
    id: number;
    nombre: string;
    puesto: string;
}

class MiembroComite {
    id: number;
    nombre: string;
    puesto: string;

    constructor({id,nombre,puesto}: Props){
        this.id = id;
        this.nombre = nombre;
        this.puesto= puesto;
    }
}

export default MiembroComite;