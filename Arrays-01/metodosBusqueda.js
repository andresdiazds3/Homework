// Estos metodos no modifican ni crean nuevos arreglos sino que retornan elementos buscados

let numeros = [10, 20, 30, 40, 26];

let encontrado = numeros.find(x => x > 25); // La función Find devuele el primer elemento del arrevlo que cumple la condición
console.log(encontrado); // 30

let indice = numeros.findIndex(x => x>25); // La función FindIndex devuelve la posición en el arreglo del primer elemento que cumple la condición
console.log(indice); // 2, si no encuentra ninguno devuelve -1

let ultimo = numeros.findLast(x => x > 25); // findLast devuelve el ultimo elemento que cumpla la condición
console.log(ultimo); // 26

let ultimoPosicion = numeros.findLastIndex(x => x > 25); // Lo mismo que findLast pero no devuelve valor sino posición
console.log(ultimoPosicion) // 4

let existe = numeros.includes(10); // La función verifica si el valor existe dentro del arreglo, y devuelve el resultado en un booleano 
console.log(existe); // true

numeros = [10, 20, 30, 40, 30];

let posicion = numeros.indexOf(30); //  Devuelve la posición de la primera aparición del elemento
console.log(posicion) // 2

let posicionUltima = numeros.lastIndexOf(30) // Devuelve la posición de la ulitma aparición del elemento
console.log(posicionUltima); // 4





