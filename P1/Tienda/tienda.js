// Practica 1: Tienda on-line

//-- Importo los modulos http y fs
const http = require('http');
const fs = require('fs');

//-- Definir el puerto a utilizar
const Puerto = 9090;

//-- Indicamos que se ha arrancado del servidor
console.log("Arrrancando el servidor...");

//-- Crear el servidor
const server = http.createServer((req, res) => {

  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  //-- Construir el objeto url con la url de la solicitud
  const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL solicitada: " + myURL.pathname);

    let page = '' //-- Página que queremos cargar
    if (myURL.pathname == "/") { //-- Cuando lanzamos nuestra página web
        page = './tienda.html'
    } else if (myURL.pathname == "/ls") { // Listado con todos los ficheros de la practica
        page = './ls.html'
    } else { // -- En cualquier otro caso
        page = '.' + myURL.pathname;
    }

    console.log("Página solicitada: " + page)

    content = page.split(".").pop()
    console.log("Contenido de la página: " + content);

    fs.readFile(page, (err, data) => {
        let code = 200;
        let code_msg = "OK";
        let content_type = "text/html";

        if (err) { // Mostramos la página de error
            console.log('ha habido error')
            var HOME_HTML = fs.readFileSync('./error.html', 'utf-8');
            res.statusCode = 404;
            res.statusMessage = "Ha habido un error";
            res.setHeader('Content-Type', "text/html");
            res.write(HOME_HTML);
            return res.end();
        }
        switch (content) {
            case 'html':
                content_type = "text/html";
            case 'css':
                content_type = "text/css";
            default:
                content_type = content;
        }
        res.statusCode = code;
        res.statusMessage = code_msg;
        res.setHeader('Content-Type', content_type);
        res.write(data);
        res.end();
    });

});


//-- Activar el servidor: 
server.listen(Puerto);

//-- Indicamos que se ha iniciado el servidor
console.log("Tienda on-line activada!. Escuchando en puerto: " + Puerto); 