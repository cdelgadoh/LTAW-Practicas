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