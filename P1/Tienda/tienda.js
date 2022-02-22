// Practica 1: Tienda on-line

const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

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
    //HAY MAS DE UNA / SIGNIFICA QUE ESTA EN OTRA CARPETA
    let cant = 0;
    //si hay mas de una /, significa que esta dentro de una carpeta
    for(var i = 0; i < q.pathname.length; i++) {
  	   if (q.pathname[i] == "/")
          cant = cant+1;
     }

     if (cant>1){
        filename = "." + q.pathname
    }else{
        filename = q.pathname.slice(1)
    }

    //PARA ENCONTRAR EL TIPO, MIME
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