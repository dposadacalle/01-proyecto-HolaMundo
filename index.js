// const name = 'Daniel';
// const year = new Date().getFullYear();

// console.log(`Hey ${name}, we are in ${year}`);

// console.log(process.argv);

// const colors = require('colors/safe');
const commandLineArgs = require("command-line-args");

const params = [{
    name: 'name',
    alias: 'n',
    type: String
}];

/*
El objeto process.argv es un Array que en cada posición almacena cada argumento, en este caso
el primero, es la ubicación del ejecutable de Node.js y, el segundo, es el archivo de entrada de la
aplicación. Los argumentos se interpretan ya que van separados por espacios.
*/

const options = commandLineArgs(params);
// const args = process.argv.slice(2);
// const [name = "Friend"] = args;
const name = options.name || "Friend";
const hour = new Date().getHours();

// Ask for Range Hour

if (hour >= 6 && hour < 12) {
    console.log(`Good morning ${name}`);
} else if (hour >= 12 && hour < 18) {
    console.log(`Good afternoon ${name}`);
} else if (hour >= 18 && hour < 23) {
    console.log(`Good evening ${name}`);
} else {
    console.log(`Good night ${name}`);
}

const sum = function(a, b) {
    return a + b;
}

const sumFunc = sum;

console.log(sumFunc(40, 2));

const factorial = function ff(number) {
    if (number <= 0) {
        return -1;
    } else {
        return (number * ff(number - 1));
    }
};

console.log(factorial(6));

const calculator = {
    sum: function(x, y) {
        return x + y;
    }
};

console.log(calculator.sum(4, 5));

const suma = function(a, b) {
    return a + b;
}

let stack = [];

stack.push(suma);

const next = stack[0];

next(20, 2);

stack[0](40, 2);

/*
Como first class citizens podemos pasar una función como parámetro dentro de otra función y
utilizarla dentro de esta segunda función, tome como ejemplo el siguiente código::
*/

const sumDosNumeros = function(a, b) {
    return a + b;
};

function calc(a, b, op) {
    let res = op(a, b);
    return res;
}

console.log(40, 2, sumDosNumeros);

// Continuation-passing style (CPS)
function sumSync(a, b, callback) {
    callback(a + b);
}

console.log("before");

sumSync(40, 2, function(result) {
    console.log("Result: ", result);
});

console.log("After");

// Asynchronous continuation-passing style

function sumAsync(a, b, callback) {
    // Metodo SetTimeOut simulamos un llamado asincronico. 
    setTimeout(function() {
            callback(a + b);
        }, 1000) // y despues de un 1s se invoca la funcion
};

console.log("before");

sumAsync(40, 2, function(result) {
    console.log("Result: ", result);
});

console.log("After");

/**
 *   CallBacks - En todos los métodos de Node.js que aceptan un callback como parámetro, 
 *   este es pasado  siempre como último argumento.
 */

// fs: FileSystem
const fs = require('fs');

/***
 *   En CPS(Continuation-passing style) 
 *   los errores pueden ser propagados como un tipo de resultado     de la función invocada, en
     Node.js; es pasado como primer argumento y de allí en adelante se pasan los demás parámetros
     a la función. En una operación sin errores, este toma el valor de null o undefined. Analicemos
     nuevamente el mismo fragmento de código:
 */

/**
 *  Como puede observar, 
 *  1: El parámetro de error (err) es enviado de primero en la función de callback
    2: de segundo, el contenido del archivo leído (Content).
    3: Como pueden observar el callback una vez se ha leído el archivo es el último argumento de la función
 */

fs.readFile('data.json', 'utf8', (err, content) => {
    if (err) throw err;
    console.log(content);
});