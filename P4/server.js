// Cargar electron
const electron = require('selectron');

console.log("Arrancando electron...");

// Cargar dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const snakeNames = require('snake-names');
const ip = require('ip');

const PUERTO = 9090;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

let counter = 0

// Acceso a la ventana principal
let win = null;

function date(){
  var fecha = new Date();
  var d = fecha.getDate();
  var m = fecha.getMonth()+1;
  var y = fecha.getFullYear();
  var h = fecha.getHours();
  var m = fecha.getMinutes();
  var s = fecha.getSeconds();
  return  'Fecha:' + d + '/' + m + '/' + y + 'Hora:' + h + ':' + m + ':' + s ;
}

// PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  let path = __dirname + '/public/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow + socket.id);

   //-- Le damos la bienvenida a través del evento 'hello'
   counter += 1;
    //-- Enviar numero de usuarios al renderer
  win.webContents.send('user', counter);
   socket.id =  snakeNames.random() ;
   socket.send('Bienvenido al Chat' + "  " + socket.id + "!" );
   win.webContents.send('msg_client', 'Bienvenido al Chat' + "  " + socket.id + "!" );
  
     //-- Enviar mensaje de nuevo usuario a todos los usuarios
  io.send(  "<i>" + socket.id  + "</i> " +'entró al chat. ');

  //-- Enviar al render mensaje de conexion
  win.webContents.send('msg_client', "<i>" + socket.id  + "</i> " +'entró al chat. ');

//-- Evento de desconexión
socket.on('disconnect', function(){
  console.log('** CONEXIÓN TERMINADA **'.yellow);
  counter -= 1;
  win.webContents.send('user', counter);

      //-- Enviar mensaje de desconexión de usuario a todos los usuarios
      io.send( "<i>" +  socket.id  + " </i> " + 'abandonó el chat. ');

      //-- Enviar al render mensaje de desconexion
      win.webContents.send('msg_client', "<i>" +  socket.id  + " </i> " + 'abandonó el chat. ');
});  

//-- Mensaje recibido: Reenviarlo a todos los clientes conectados
socket.on("message", (msg)=> {
  //-- Enviar al render
  win.webContents.send('msg_client', socket.id + ': '  + msg);
  if (msg.startsWith("/")) {
      if (msg == "/help") {
        socket.send("Comandos: <br>" +
        ">> <b>/help --> Visualización los comandos existentes<br>" +
        ">> <b>/list --> Visualización del número de usuarios conectados<br>" +
        ">> <b>/hello --> El servidor devuelve un saludo<br>" +
        ">> <b>'/date --> Visualización de la fecha actual<br>");
      }else if (msg == "/list") {
          socket.send(">> Número de usuarios conectados: " + counter);
      }else if (msg == "/hello") {
          socket.send(">> Hello");
      }else if (msg == "/date") {
          let now= new Date();
          socket.send('>> Hoy es: '+ date());
          
      }else{
        socket.send('>> Comando incorrecto');
      }    
  }else{
    //-- Mensaje normal, se reenvia a todos los clientes conectados
    io.send("<b>" + socket.id + "</b> : "  + msg);
    
  }
});

});
//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

//-- Punto de entrada
electron.app.on('ready', () => {
  console.log("Evento Ready!");

  // Creo una nueva ventana
  win = new electron.BrowserWindow({
    width: 600,  // Anchura 
    height: 400, // Altura
    
    // Permitir acceso al sistema
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // Quitar menú por defecto
  // win.setMenuBarVisibility(false)

  // Cargar el contenido
  win.loadFile("chat.html");

  // La pagina se carga 
  // aparece el mensaje por 
  // la interfaz gráfica
  win.on('ready-to-show', () => {
    console.log("Hola");
    win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
  });
});

// Recibir mensajes
electron.ipcMain.handle('test', (event, msg) => {
  io.send(msg);
  win.webContents.send('msg', msg);
});