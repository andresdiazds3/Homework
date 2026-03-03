import Student from "../classes/Student";
import pfp from "../img/pfp.webp"

const studentsData: Student[] = [
  new Student({ pfp, id: 1, name: "Juan Pérez", age: 20, code: 1001 }),
  new Student({ pfp, id: 2, name: "María Gómez", age: 22, code: 1002 }),
  new Student({ pfp, id: 3, name: "Carlos Rodríguez", age: 19, code: 1003 }),
  new Student({ pfp, id: 4, name: "Laura Martínez", age: 21, code: 1004 }),
  new Student({ pfp, id: 5, name: "Andrés López", age: 23, code: 1005 }),
];

export default studentsData;