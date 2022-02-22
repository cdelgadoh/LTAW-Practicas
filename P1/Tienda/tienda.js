// Practica 1: Tienda on-line

const http = require('http');
const url = require('url'); //para parsear
const fs = require('fs');
const PUERTO = 9090

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)

  //variables: filename = recurso que se pide; mime = tipo de recurso
  let filename = "";
  let mime = "";


  if (q.pathname == "/"){
    filename += "tienda.html"
    mime = "text/html"
  }else{

    let cant = 0;

    for(var i = 0; i < q.pathname.length; i++) {
  	   if (q.pathname[i] == "/")
          cant = cant+1;
     }

     if (cant>1){
        filename = "." + q.pathname
    }else{
        filename = q.pathname.slice(1)
    }


    num = q.pathname.lastIndexOf(".");
    mime = q.pathname.slice(num+1)
    mime = "text/" + mime
  }


  //-- Leer fichero
  fs.readFile(filename, function(err, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)