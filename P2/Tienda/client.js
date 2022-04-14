console.log("Ejecutando Javascript...");

//-- Elementos HTML para mostrar informacion
const display1 = document.getElementById("display1");

//-- Caja de busqueda
const caja = document.getElementById("caja");

//-- Retrollamda del boton de Ver productos
caja.oninput = () => {

    //-- Crear objeto para hacer peticiones AJAX
    const objeto = new XMLHttpRequest();

    //-- Función de callback que se invoca cuando
    //-- hay cambios de estado en la petición
    objeto.onreadystatechange = () => {

        //-- Petición enviada y recibida. Todo OK!
        if (objeto.readyState==4) {

            //-- Solo la procesamos si la respuesta es correcta
            if (objeto.status==200) {

                //-- La respuesta es un objeto JSON
                let productos = JSON.parse(objeto.responseText)

                console.log(productos);

                //-- Borrar el resultado anterior
                display1.innerHTML = "";

                //--Recorrer los productos del objeto JSON
                for (let i=0; i < productos.length; i++) {

                    //-- Añadir cada producto al párrafo de visualización
                    display1.innerHTML += productos[i];

                    //-- Separamos los productos por ',''
                    if (i < productos.length-1) {
                    display1.innerHTML += ', ';
                    }
                }

            } else {
                //-- Hay un error en la petición
                //-- Lo notificamos en la consola y en la propia web
                console.log("Error en la petición: " + objeto.status + " " + objeto.statusText);
                display2.innerHTML += '<p>ERROR</p>'
            }
        }
    }

    console.log(caja.value.length);

    //-- La peticion se realia solo si hay al menos 1 carácter
    if (caja.value.length >= 3) {

      //-- Configurar la petición
      m.open("GET","/productos?param1=" + caja.value, true);

      //-- Enviar la petición!
      m.send();
      
    } else {
        display1.innerHTML="";
    }
}