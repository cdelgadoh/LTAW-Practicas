// Elementos del interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");

// Acceder a la API de node para obtener la info
// Sólo es posible si nos han dado permisos desde
// el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

btn_test.onclick = () => {
  display.innerHTML += "TEST! ";
  console.log("Botón apretado!");
}

// Mensaje recibido desde server.js
Electron.ipcRenderer.on('print', (event,msg)=> {
  console.log("Recibido: " + msg);
  print.textContent = msg;
});