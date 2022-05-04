// Cargar electron
const electron = require('selectron');

console.log("Arrancando electron...");

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
  win.loadURL("chat.html");
});