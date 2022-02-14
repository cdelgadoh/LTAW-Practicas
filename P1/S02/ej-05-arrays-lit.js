//-- Ejemplo de arrays literales

//-- Crear una lista (array) de 4 elementos
const a = [1,3,5,7]; // Corchetes accedes elemtos lista

//-- Mostrar el elemento 2
console.log("Elemento 2: " + a[2]);

//-- Recorrer todos los elementos
for (i in a) {
    console.log(`a[${i}] = ${a[i]}`);
}
//iterar todos los valores del array y vas imprimiendo

//-- Imprimir el numero total de elementos
console.log("Cantidad de elementos: " + a.length); //imprimir nºelementos