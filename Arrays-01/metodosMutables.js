// En este archivo se encuentran aquellos metodos JavaScript, que lo que realizan es 
// modificar el array original.

let numeros = [1, 2, 3, 4, 5];

numeros.push(6,7,8); // Agrega uno o mas elementos al final del array
console.log(numeros); 

numeros.unshift(1); // Agrega uno o mas elementos al principio del array
console.log(numeros)

numeros.pop(); // Esta función elimina el ultimo elemento del array
console.log(numeros)

numeros.shift(); // Esta función elimina el primer elemento del arreglo}
console.log(numeros)

/*
 splice()
 Permite agregar, eliminar o reemplazar elementos.
 splice(inicio, cantidad, elementos)
 Modifica el array original.
*/
numeros.splice(1, 1, 9); // En este caso estamos reemplazando desde el elemento de indice 1, borrando 1 elemento e insertando el 9
console.log(numeros); 
var myFish = ["angel", "clown", "drum", "mandarin", "sturgeon"];
var removed = myFish.splice(3, 2); // iniciando desde el indice 3, y borrando dos elementos sin reemplazar ninguno, pero en este caso ambos elementos borrados se guardan en la variable removed

numeros.sort((a, b) => a - b); // ordenamos los elementos de menor a mayor seria b-a si fuera de mayor a menor
console.log(numeros);

numeros.reverse(); // Esta función reinvierte los elementos del arreglo, del reves.
console.log(numeros);

/*
 fill()
 Rellena el array con un valor específico.
 fill(valor, inicio, fin)
 Modifica el array original.
*/
numeros.fill(7, 1, 3); // En este caso vamos a rellenar el valor 7, desde el indice 1 hasta el anterior del 3
console.log(numeros);

/*
 copyWithin()
 Copia una parte del array en otra posición del mismo array.
 copyWithin(destino, inicio, fin)
 Modifica el array original.
*/
numeros.copyWithin(1, 2); // En este caso se copia al indice 1 los elementos del indice 2 en adelante, en caso de tercer parametro es hasta donde sin incluirlo
console.log(numeros); 




