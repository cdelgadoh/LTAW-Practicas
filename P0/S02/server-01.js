//-- Importar el módulo 'http'. 
// Node incluye el modulo si lo tienes instalado 
// y lo puedes  utilizar.
const http = require('http'); //declarar que los quieres usar.

//for (p in http) {
//    console.log("Propiedad: " + p);
//}

//-- Crear el servidor
const server = http.createServer();

//-- Función de retrollamada de petición recibida
//-- Cada vez que un cliente realiza una petición
//-- Se llama a esta función
function atender(req, res) {
    //-- req: http.IncomingMessage: Mensaje de solicitud
    //-- res: http.ServerResponse: Mensaje de respuesta (vacío)

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");

    //-- pero no enviamos respusta (todavía)
}

//-- Activar la función de retrollamada del servidor
server.on('request', atender);

//-- Activar el servidor. A la escucha de peitciones
//-- en el puerto 8080
server.listen(8080);