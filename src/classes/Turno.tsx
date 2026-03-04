type Props = {
    id: number;
    nombre: string;
    turno: number;
}

class Turno {
    id: number;
    nombre: string;
    turno: number;

    constructor({id,nombre,turno}: Props){
        this.id = id;
        this.nombre = nombre;
        this.turno = turno;
    }
}

export default Turno;