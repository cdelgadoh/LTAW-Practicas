const http = require('http');
const fs = require('fs');

const PUERTO = 9090;


const FICHERO_JSON = 'tienda.json';
let tienda_json = fs.readFileSync(FICHERO_JSON);
let tienda = JSON.parse(tienda_json);
let lista_productos = [];
tienda.productos.forEach((element) => {
    lista_productos.push(element.nombre);
})

const server = http.createServer((req, res) => {

    console.log("_____________________________________________");
    console.log("Petición recibida!");

    //-- Valores por defecto de la respuesta
    let code = 200;
    let code_msg = 'OK';
    let page = '';
    
    //Construyo la URL que ha solicitado el cliente y extraigo el recurso solicitado
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log('RECURSO PEDIDO: ' + url.pathname);

    //Inicialización de variables
    let fichero = '';
    let nickname = '';
    let direccion = '';
    let tarjeta = '';
    let nuevo_pedido = {};
    let cookie = '';
    let cookie_carrito = 'carrito=';
    let carrito = [];

    //Extraigo las cookies
    cookie = req.headers.cookie;
    if (cookie) {
        let pares = cookie.split(';');
        pares.forEach((element, index) => {
            let [nombre, valor] = element.split('=');
            if (nombre.trim() === 'user') {
                nickname = valor;
            } else if (nombre.trim() === 'carrito') {
                cookie_carrito = element;
                carrito = valor.split(':');
                carrito.pop();
            }
        });
    }

    // Saco el nombre del fichero que tengo que buscar
    if (url.pathname=='/') {
        fichero = 'tienda.html';
    } else if (url.pathname=='/productos') {
        fichero = 'tienda.json';
    } else if (url.pathname == '/login') {
        nickname = url.searchParams.get('nick');
        console.log("Login: " + nickname);
        found = false;
        for (i = 0; i < tienda.usuarios.length; i++) {
            if (tienda.usuarios[i].nickname == nickname) {
                found = true;
            }
        }
        if (found == true) {
            res.setHeader('Set-Cookie', "user="+nickname);
            fichero = 'welcome.html';
        } else {
            fichero = 'login_error.html';
        }
    } else if (url.pathname == '/finalizar') {
        fichero = 'compra.html';
        direccion = url.searchParams.get('direccion');
        tarjeta = url.searchParams.get('tarjeta');
        nuevo_pedido = {"nickname": nickname,"direccion":direccion,"tarjeta":tarjeta,"producto":carrito};
        tienda['pedidos'].push(nuevo_pedido);
        tienda_json = JSON.stringify(tienda);
        fs.writeFileSync(FICHERO_JSON, tienda_json);
    } else if (url.pathname == '/login.html') {
        fichero = 'login.html';
        if (nickname) {
            fichero = 'login_res.html';
        }
    } else if (url.pathname == '/carrito_cc') {
        if (nickname) {
            cookie_carrito += "cc:"
            res.setHeader('Set-Cookie', cookie_carrito);
        }
        fichero = 'P1.html';
    } else if (url.pathname == '/carrito_vp') {
        if (nickname) {
            cookie_carrito += "vp:"
            res.setHeader('Set-Cookie', cookie_carrito);
        }
        fichero = 'P2.html';
    } else if (url.pathname == '/carrito_on') {
        if (nickname) {
            cookie_carrito += "on:";
            res.setHeader('Set-Cookie', cookie_carrito);
        }
        fichero = 'P3.html';
    } else if (url.pathname == '/carrito_tm') {
        if (nickname) {
            cookie_carrito += "tm:";
            res.setHeader('Set-Cookie', cookie_carrito);
        }
        fichero = 'P4.html';
    } else if (url.pathname == '/busqueda') {
        fichero = 'tienda.html';
    } else if (url.pathname == '/buscar') {
        let se_busca = url.searchParams.get('producto');
        se_busca = se_busca.toUpperCase();
        if (se_busca == 'cc') {
            fichero = 'P1.html';
        } else if (se_busca == 'vp') {
            fichero = 'P2.html';
        } else if (se_busca == 'on') {
            fichero = 'P3.html';
        } else if (se_busca == 'tm') {
            fichero = 'P4.html';
        } else {
            fichero = 'tienda.html';
        }
    } else {
        fichero = url.pathname.slice(1);
    }
    console.log("Se busca el fichero: " + fichero);



    //Lectura asincrona del fichero
    fs.readFile(fichero, (err, data) => {
        
        if (err) {
            //Si no se encuentra el fichero
            console.log("Error!");
            console.log(err.message);
            code = 404;
            code_msg = "Not Found";
            res.setHeader('Content-Type', 'text/html');
        } else {
            console.log("Fichero encontrado!");
            //Extraigo la extension del nombre del fichero segun cual sea
            //hago la respuesta que corresponda
            punto = fichero.indexOf('.');
            extension = fichero.slice(punto + 1);
            if (extension == 'html'){
                res.setHeader('Content-Type', 'text/html');
            } else if (extension == 'jpg'){
                res.setHeader('Content-Type', 'image/jpg');
            } else if (extension == 'png') {
                res.setHeader('Content-Type', 'image/png');
            } else if (extension == 'css') {
                res.setHeader('Content-Type', 'text/css');
            } else if (extension == 'json') {
                res.setHeader('Content-Type', 'application/json');
            } else if (extension == 'js') {
                res.setHeader('Content-Type', 'aplication/javascript');
            }
            page = data;
            if (fichero == 'welcome.html' || fichero == 'login_error.html' || fichero == 'login_res.html') {
                page = page.toString().replace("USUARIO", nickname);
            } else if (fichero == 'tienda.html') {
                if (url.pathname == '/busqueda') {
                    res.setHeader('Content-Type', "application/json");
                    //-- Leer los parámetros
                    let param1 = url.searchParams.get('param1');
                    param1 = param1.toUpperCase();
                    let result = [];
                    for (let prod of lista_productos) {
                        //-- Pasar a mayúsculas
                        prodU = prod.toUpperCase();
                        //-- Si el producto comienza por lo indicado en el parametro
                        //-- meter este producto en el array de resultados
                        if (prodU.startsWith(param1)) {
                            result.push(prod);
                        }
                    }
                    page = JSON.stringify(result);
                } else if (nickname) {
                    const ENLACE_LOGIN = '<a id="botonlogin" href="login.html">LOGIN</a>';
                    const NOMBRE_USUARIO = '<a id="botonlogin" href="login_res.html">' + nickname + '</a>';
                    page = page.toString().replace(ENLACE_LOGIN, NOMBRE_USUARIO);
                }
            } else if (fichero == 'carro.html') {
                let LISTACARRO = '<ul>';
                carrito.forEach((element) => {
                    LISTACARRO += '<li>'+element+'</li>';
                })
                LISTACARRO += '</ul>';
                page = page.toString().replace('LISTACARRO', LISTACARRO);
            } else if (fichero == 'P1.html') {
                const DESCRIPCION = tienda.productos[0].descripcion;
                page = page.toString().replace('DESCRIPCIONJSON', DESCRIPCION);
            } else if (fichero == 'P2.html') {
                const DESCRIPCION = tienda.productos[1].descripcion;
                page = page.toString().replace('DESCRIPCIONJSON', DESCRIPCION);
            } else if (fichero == 'P3.html') {
                const DESCRIPCION = tienda.productos[2].descripcion;
                page = page.toString().replace('DESCRIPCIONJSON', DESCRIPCION);
            } else if (fichero == 'P4.html') {
            const DESCRIPCION = tienda.productos[3].descripcion;
            page = page.toString().replace('DESCRIPCIONJSON', DESCRIPCION);
        }
        }
        //Asigno los valores de la respuesta y la envio
        res.statusCode = code;
        res.statusMessage = code_msg;
        res.write(page);
        res.end();
        console.log("Respuesta enviada!");
    })
});

//Lanzo el servidor
server.listen(9090);
console.log('Servidor escuchando en el puerto ' + PUERTO);