//-- Importar el módulo FS
const fs = require('fs');

console.log("Lectura asíncrona de un fichero");

//-- Realizar la lectura asíncrona
fs.readFile('fich1.txt','utf8', (err, data) => {

    console.log("A");
});

console.log("B");
const data1 = fs.readFileSync('fich2.txt','utf-8');
console.log("C");