type Props = {
    id: number;
    nombre: string;
    sintoma: string;
}

class Paciente {
    id: number;
    nombre: string;
    sintoma: string;

    constructor({id,nombre,sintoma}: Props){
        this.id = id;
        this.nombre = nombre;
        this.sintoma = sintoma;
    }
}

export default Paciente;