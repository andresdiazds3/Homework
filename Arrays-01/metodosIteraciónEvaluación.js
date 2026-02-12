// Estos metodos recorren los Arrays de forma eficiente, ejecutando una funcion por cada elemento

    let numeros = [1,2,3,4,5]


let lista = "";
numeros.forEach( n => { //  Recorre el array ejecutando una función por cada elemento, no devuelve array
    lista += "Este elemento es de valor:"+ n + "\n" // En este caso añade una fila con ese texto por cada valor a la variable lista no devuelve otro arreglo
});
console.log(lista);

/*
Este elemento es de valor:1
Este elemento es de valor:2
Este elemento es de valor:3
Este elemento es de valor:4
Este elemento es de valor:5
*/

let algunMayor = numeros.some(n => n>4); // some verifica si en el arreglo hay por lo menos un elemento que cumpla la función devuelve booleano
console.log(algunMayor); // true

let todosPositivos = numeros.every(n => n>0)  // every verifica si todos los elementos del arreglo cumplen con la función devuelve booleano
console.log(todosPositivos) // true

//  reduce transforma un array en un único valor (número, string, objeto o nuevo array) aplicando una función acumuladora a cada elemento
const suma = numeros.reduce((acc, curr) => acc + curr, 0); // 10

//si quisieramos transformar datos podemos tomar este ejemplo:
const productos = [
  { nombre: "Manzana", tipo: "fruta" },
  { nombre: "Pera", tipo: "fruta" },
  { nombre: "Papa", tipo: "verdura" }
];
const agrupados = productos.reduce((acc, obj) => {
  const tipo = obj.tipo;
  if (!acc[tipo]) acc[tipo] = [];
  acc[tipo].push(obj.nombre);
  return acc;
}, {});
// Resultado: { fruta: ["Manzana", "Pera"], verdura: ["Papa"] }



let resta = numeros.reduceRight((acumulador, n) => acumulador - n); // Funciona igual que reduce, pero recorre el array de derecha a izquierda
console.log(resta); // -5





