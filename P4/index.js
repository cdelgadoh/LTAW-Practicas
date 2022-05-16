const electron = require('electron');
// Elementos del interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const print = document.getElementById("print");
const usuario = document.getElementById("user");
const dir = document.getElementById("dir");

// Acceder a la API de node para obtener la info
// Sólo es posible si nos han dado permisos desde
// el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

info4.textContent = process.versions.node;
info5.textContent = process.versions.chrome;
info6.textContent = process.versions.electron;

// Numero de usuarios
electron.ipcRenderer.on('user', (event, message) => {
  console.log("Recibido: " + message);
  usuarios.textContent = message;
});

btn_test.onclick = () => {
  display.innerHTML += "TEST! ";
  console.log("Botón apretado!");
}

// Mensaje recibido de los clientes
electron.ipcRenderer.on('msg_client', (event, message) => {
  display.innerHTML += message + "<br>";
  display.scrollTop = message.scrollHeight;
});

// Mensaje recibido desde server.js
Electron.ipcRenderer.on('print', (event,msg)=> {
  console.log("Recibido: " + msg);
  print.textContent = msg;
});

electron.ipcRenderer.on('ip', (event, message) => {
  console.log("Recibido: " + message);
  ip_dir.textContent = message;
});