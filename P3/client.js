//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const nick = document.getElementById("nick");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Introducción de nickname 
let nickname = 'Unknown';



//-- Asignación de nick
nick.onchange = () => {
  if(nick.value){
    nickname = nick.value;
    console.log('Nick' + nickname);
  }
}

socket.on("message", (msg)=>{
  display.innerHTML += '<p>' + msg + '</p>';

});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value){
    socket.send(nickname + ': ' + msg_entry.value);
  }

  //-- Borrar el mensaje actual
  msg_entry.value = "";
}