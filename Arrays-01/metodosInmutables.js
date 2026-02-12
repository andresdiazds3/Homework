// En este archivo encontramos aquellas funciones no mutables
// Aquellas que no modifican el arreglo, sino que devuelven uno nuevo

let numeros = [1, 2, 3, 4];

let dobles = numeros.map(n => n * 2); //Map Regresa un arreglo aplicandole una función a cada elemento del array original
console.log(dobles); 

let pares = numeros.filter(n => n % 2 === 0); // Filter crea un nuevo arreglo filtrando los elementos que cumplan una condición
console.log("filter:", pares); 

let subArreglo = numeros.slice(1,3) // Slice toma una parte del arreglo original en este caso desde el indice 1 hasta al 3 sin contar este 
console.log(subArreglo);

numeros2 = [5,6]
let masNumeros = numeros.concat(numeros2); // Concat concatena dos o mas arreglos y los devuelve en uno
console.log(masNumeros); 

let anidado = [1, [2, [3, 4]]];
let plano = anidado.flat(2); // En este caso Flat crea un array oplanando uno hasta la profundidad indicada en el parametro
console.log(plano); // devuelve el arreglo completamente plano =  [1, 2, 3, 4]
let noTanPlano = anidado.flat(1);  
console.log(noTanPlano); // devuelve el arreglo con un subnivel = [1, 2,[3,4]]

let duplicados = numeros.flatMap( x => [x, x*2]); // flatMap es una combinación de tanto flat como map
console.log(duplicados); // [1, 2, 2, 4, 3, 6, 4, 8] Realiza la función para cada elemento y los aplana 
let duplicadosSinFlatMap = numeros.map(x => [x, x*2]) // Si solo usaramos map, devolveria arrelgos dentro del arreglo
console.log(duplicadosSinFlatMap); // [[1,2], [2,4], [3,6], [4,8]]

let invertido = numeros.toReversed(); // Devuelve el arreglo pero invertido, a diferencia de reverse, crea un nuevo arreglo
console.log(invertido); // [4, 3, 2, 1]

let ordenado = numeros.toSorted((a, b) => b - a); // De mayor a menor
console.log(ordenado) // [4, 3, 2, 1]

let nuevoArray = numeros.toSpliced(1, 1, 9); // Devuelve el arreglo original en uno nuevo con la modificación (indice: 1, cantAEliminar: 1, elementoNuevo: 9)
console.log(nuevoArray); // [1, 9, 3, 4]

let reemplazo = numeros.with(0, 99); // Devuelve un arreglo basado del nuevo con la modificación (indice:0, cambio:99)
console.log(reemplazo); // [99, 2, 3, 4]



