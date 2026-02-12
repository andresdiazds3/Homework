
// Metodos de conversión

let numeros = [1, 2, 3];

let texto = numeros.join("-"); // Join convierte el array en un string usando el parametro para separar los elementos
console.log(texto); // "1-2-3"

let cadena = numeros.toString();// toString convierte el array en una cadena separada por comas
console.log(cadena); // "1,2,3"

let locales = numeros.toLocaleString // convierte el array en un String pero bajo la configuración regional, en caso de colombia es comas
console.log(locales); // "1,2,3"

// Metodo Especial

let numeroEspecial = numeros.at(-2); // Busca el numero mediante un valor numérico entero y devuelve el elemento en esa posición, si es negativo cuenta de ultimo a primero y si es positivo viceversa
console.log(numeroEspecial) // 2

// Metodos de información

let usuario = {
  nombre: "Carlos",
  edad: 22,
  ciudad: "Cali"
};

console.log(Object.keys(usuario));    // ["nombre", "edad", "ciudad"] devuelve las claves del objeto 

console.log(Object.values(usuario));  // ["Carlos", 22, "Cali"] devuelve los valores de las claves del objetos 

console.log(Object.entries(usuario)); // [["nombre","Carlos"], ["edad", 22], ["ciudad", "cali"]] devuelve los pares de clave y valor


// Metodos estaticos de Array

ArregloONo = Array.isArray(numeros); // Verifica si una variable es un array
console.log(ArregloONo); // true

let letras = Array.from("Hola"); // crea un arreglo a partir de un objeto que se pueda iterar
console.log("Array.from:", letras); // ['H','o','l','a']

let creado = Array.of(10, 20, 30); // crea un arreglo a partir de los parametros insertados 
console.log("Array.of:", creado); // [10,20,30]
