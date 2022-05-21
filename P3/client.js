//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const sound = document.getElementById("sound");
const nick = document.getElementById("nick");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Introducción de nickname 
let nickname = 'Unknown';

//-- Usuario esta escribiendo
let writing = false;

//-- Asignación de nick
nick.onchange = () => {
  if(nick.value){
    nickname = nick.value;
    console.log('Nick' + nickname);
  }
}

socket.on("message", (msg)=>{
  display.innerHTML += '<p>' + msg + '</p>';

  //-- Sonido al recibir mensaje expecto escribiendo...
  if (!msg.includes("escribiendo...")){  
    sound.play();
  }
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value){
    writing = false;
    socket.send(nickname + ': ' + msg_entry.value);
  }

  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

//-- Mensaje escribiendo...
msg_entry.oninput = () => {
  if(!writing){
    writing = true;
    socket.send('El usuario ' + nickname + ' esta escribiendo...');
  };
};