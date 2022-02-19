// Practica 1: Tienda on-line

//-- Importo los modulos http y fs
const http = require('http');
const fs = require('fs');
const url = require('url');

//-- Definir el puerto a utilizar
const Puerto = 9090;

//-- Indicamos que se ha arrancado del servidor
console.log("Arrrancando el servidor...");

//-- Crear el servidor
const server = http.createServer((req, res) => {

  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  //-- Construir el objeto url con la url de la solicitud
  


  //-- Cabecera que indica el tipo de datos del
  //-- cuerpo de la respuesta: Texto plano
  res.setHeader('Content-Type', 'text/plain');

  //-- Mensaje del cuerpo
  res.write("Tienda on-line\n");

  //-- Terminar la respuesta y enviarla
  res.end();
});

//-- Activar el servidor: 
server.listen(Puerto);

//-- Indicamos que se ha iniciado el servidor
console.log("Tienda on-line activada!. Escuchando en puerto: " + Puerto); 