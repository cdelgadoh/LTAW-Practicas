// Practica 1: Tienda on-line

//-- Importar los modulos http, fs y url
const http = require('http');
const fs = require('fs');
const url = require('url');

//-- Definir el puerto a utilizar
const Puerto = 9090;

//-- Mensaje de arranque
console.log("Arrancando servidor...");

//-- Crear el sevidor
const server = http.createServer(function (req, res) {

  //-- Indicar que se ha recibido una peticion
  console.log("Peticion Recibida");

  //-- Crear el objeto URL del mensaje de solitud (req)
  //-- y coger el recurso (url)
  let myURL = url.parse(req.url, true);

  //-- Escribir en consola la ruta de nuestro recurso
  console.log("Recurso recibido: " + myURL.pathname);

  //-- Definir la variable fichero
  let filename = "";

  //-- Obtener la ruta (pathname)
  //-- Comprobar si la ruta es elemento raiz
  //-- Obtener fichero a devolver
  if (myURL.pathname == "/"){
    filename += "tienda.html";  //-- Abrir la pagina principal
  }else{
    filename += myURL.pathname.substr(1);  //-- Abrir el fichero solicitado
  }

  //-- Ruta asignada
  console.log('Fichero a devolver: ' + filename);
  
  //-- Extraer el tipo de mime que es la ruta
  //-- y quedarse con la extenson
  let ext = filename.split(".")[1];

  //-- Escribir el tipo de mime solicitado
  console.log('Tipo de dato pedido: ' + ext);

  //-- Definir los tipos de mime
  const tiendaType = {
    "html" : "text/html",
    "css"  : "text/css",
    "jpg"  : "image/jpg",
    "JPG"  : "image/jpg",
    "jpeg" : "image/jpeg",
    "png"  : "image/png",
    "gif"  : "image/gif",
    "js"   : "text/js",
  };

  //-- Asignar que tipo de mime leer
  let tienda = tiendaType[ext];

  fs.readFile(filename, function(err, data){
    //-- Controlar si la pagina es no encontrada.
    //-- Devolver pagina de error personalizada, 404 NOT FOUND
    if ((err) || (filename == 'error.html')){
      res.writeHead(404, {'Content-Type': tienda});
      console.log("Not found");
    }else{
      //-- Todo correcto
      //-- Mandar el mensaje 200 OK
      res.writeHead(200, {'Content-Type': tienda});
      console.log("200 OK");
    } 
    //-- Enviar los datos del fichero solicitado  
    res.write(data);
    res.end();
  });
});

//-- Activar el servidor
server.listen(Puerto);

//-- Mensaje de inicio
console.log("Escuchando en puerto: " + Puerto);