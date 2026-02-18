// Función que Indica si es par o en par con metodo tradicional
function esParOImpar(n){
    if(n%2 != 0){
        console.log(`El numero ${n} es impar`)
    }else{
        console.log(`El numero ${n} es par`)
    }
}

// Funcion pero flecha

const parImparPeroArrow = (n) => {
    if(n%2 != 0){
        console.log(`El numero ${n} es impar`)
    }else{
        console.log(`El numero ${n} es par`)
    }
}

// Esta solo la hice para aprender que era el operador ternario 

const parImpar = (n) => {
    let queEs = (n%2 == 0) ? "Es Par" : "Es Impar";
    console.log(queEs);
}

