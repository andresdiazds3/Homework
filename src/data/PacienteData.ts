import Paciente from "../classesObjects/Paciente";

const PacienteData: Paciente[] = [
    new Paciente({id: 1, nombre: "Juan Pérez", sintoma: "Fiebre y dolor de cabeza"}),
    new Paciente({id: 2, nombre: "María García", sintoma: "Dolor abdominal"}),
    new Paciente({id: 3, nombre: "Carlos López", sintoma: "Tos persistente"}),
    new Paciente({id: 4, nombre: "Ana Martínez", sintoma: "Mareos y náuseas"}),
]

export default PacienteData;
