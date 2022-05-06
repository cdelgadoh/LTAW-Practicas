//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const nick = document.getElementById("nick");
const audio = document.getElementById("audio");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

let nickname = 'Unknown';

// Nick
nick.onchange = () => {
  if(nick.value){
    nickname = nick.value;
    console.log('Nick' + nickname);
  }
}

socket.on("message", (msg_entry)=>{
  display.innerHTML += "<br> > " + msg_entry;  
});

// Enviar mensaje
msg_entry.onclick = () => {
  if (msg_entry.value){
    socket.send(nickname + ': ' + msg_entry.value);
    audio.play();
  }
  //-- Borrar el mensaje actual
  msg_entry.value = "";  
}

