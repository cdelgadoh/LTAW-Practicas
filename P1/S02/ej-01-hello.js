//-- Importar el módulo 'http'. 
// Node incluye el modulo si lo tienes instalado 
// y lo puedes  utilizar.
 //declarar que los quieres usar.



const server = http.createServer((req,res) => {
    res.write("Hola");
    res.end();
});


//-- Activar la función de retrollamada del servidor


//-- Activar el servidor. A la escucha de peitciones
//-- en el puerto 8080
server.listen(8080);

