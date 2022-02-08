# Ejercicios de la sesión 1
## Ejercicio 1
Dado este documento descrito en SGML, usando el tipo de documento urjc_ml definido en el fichero urjc_ml.dtd

<!DOCTYPE urjc_ML SYSTEM "urjc_ml.dtd">
<urjc_ml>
  <!-- include URL URJC -->
  <campus>
    <nombre>Campus de Fuenlabrada</nombre>
    <escuela>
      <nombre>ETSI Telecomunicación</nombre>
      <grado>
        <nombre>Ingeniería en Sistemas Audiovisuales y Multimedia </nombre>
        <asignatura>Laboratorio de Tecnologias Audiovisuales en la Web</asignatura>
        <asignatura>Construcción de servicios y Aplicaciones Audiovisuales en Internet</asignatura>
      </grado>
    </escuela>
  </campus>
</urjc_ml>

**a) Explica para qué sirve la primera línea del documento y por qué es necesaria**
La primera línea indica el tipo de documento. La definición de este documento se encuentra en el fichero local urjc_ml.dtd. El programa que haga el procesado deberá abrir primero el documento de la definición para saber qué etiquetas son válidas y poder así validar el documento o encontrar errores en su sintáxis.
**b) Si se omitiese esta línea, ¿Qué piensas que ocurriría?**
El analizador sintáctico no sabrá de qué tipo de documento se trata, y por tanto no podrá analizarlo. Se producirá un error.
**c) Sin conocer el contenido del fichero urjc_ml.dtd, ¿el documento es sintácticamente correcto?**
En el documento DTD están definidas las etiquetas de nuestro lenguaje (Su gramática). Sin saber su contendio no sabemos si las etiquetas usadas son válidas o no. Sin embargo, sí podemos ver que es sintáticamente correcto, ya que todas las etiquetas siguen la sintáxis de SGML. 
Es un documento sintacticamente correcto, pero no podemos determinar si es válido o no.
**d) ¿Qué hace la tercera línea?**
Es un comentario por lo tanto no hace nada. Es información para el creador.
**e) ¿Cuantas etiquetas de apertura hay? ¿Cuantas de cierre?**
Hay 9 etiquetas de apertura: <urjc_ml>, <campus>, <nombre>, <escuela>, <nombre>, <grado>, <nombre>, <asignatura> y <asignatura>. 
De cierra hay otras 9. Las mismas pero con el símbolo / delante del nombre de la etiqueta. La Primera etiqueta es especial: Es autocontenida. Lo mismo con la etiqueta del comentario.

## Ejercicio 2
Este arbol representa la estructura del tipo de documento universidad, que está definido en el archivo llamado universidad.dtd. Los nombres de las etiquetas de cada elemento del árbol están escritos en los nodos. Estos nombres son válidos y se encuentra definidos dentro del documento DTD.
**a) Escribe el documento en SGML que representa esa estructura**
<!DOCTYPE Universidad SYSTEM "Universidad.dtd">

<Universidad>
  <Escuela>
    <Nombre>ETSI Telecomunicacion</Nombre>
    <Grado>
      <Nombre>Ingeniería en Sistemas Audiovisuales y Multimedia</Nombre>
      <Asignatura>LTAW</Asignatura>
      <Asignatura>CSAAI</Asignatura>
      <Asignatura>ASA II</Asignatura>
    </Grado>
      <Nombre>Ingeniería en Robótica Software</Nombre>
      <Asignatura>AC</Asignatura>
    <Grado>
    </Grardo>
  </Escuela>
</Universidad>

**b) ¿Cuántos elementos contenedores hay? Indica sus nombres**
Son los que contienen otros elementos. Hay 11. En el nivel 0 está Universidad. En el nivel 1: Escuela. En el nivel 2: Nombre, Grado, y Grado. En el nivel 3: Nombre, Asignatura, Asignatura, Asignatura, Nombre, Asignatura
**c) ¿Cuantos elementos terminales hay?**
Son los que no contienen otros elementos, y están situados justo al final de cada rama. Hay 7. En el nivel 3: "ETSI Telecomunicación". En el nivel 4: "Ingeniería en Sistemas Audiovisuales y Multimedia", "LTAW", "CSAAI", "ASA II", "Ingeniería en Robótica Software", "AC"
**d)¿Cuantos elementos hay en el nivel 3?. Escribe sus nombres**
Hay 7 elementos. Son: "ETSI Telecomunicacion", "Nombre", "Asignatura", "Asignatura", "Asignatura", "Nombre", "Asignatura".
## Ejercicio 3
Este arbol representa la estructura del tipo de documento generic, que está definido en el archivo llamado generic.dtd. Los nombres de las etiquetas de cada elemento del árbol están escritos en los nodos. Estos nombres con válidos y se encuentra definidos dentro del documento DTD.
**a) Escribe el documento en SGML que representa esa estructura**
<!DOCTYPE Generic SYSTEM "generic.dtd">

<Generic>
  <Contenedor>
    Texto 5
    <Contendor>
      <Contenedor>
        <Contenedor>
          Texto 1
        </Contenedor>
        Texto 2
      </Contenedor>
      Texto 3
      <Contenedor>
        Texto 4
      </Contenedor>
    </Contenedor>
  </Contenedor>
</Generic>

**b) ¿Cuantos elementos hay en total?** 11
**c) ¿Cuantos elementos terminales hay?. Indica sus valores** 5. Nivel 2: "Texto 5". Nivel 3: "Texto 3". Nivel 4: "Texto 2" y "Texto 4". Nivel 5: "Texto 1".
**d) ¿Cuantos elementos no terminales hay?. Indica cuántos hay en cada nivel** 6.  Nivel 0: hay 1 (Generic). Nivel 1: 1 (Contendor). Nivel 2: 1 (Contenedor). Nivel 3: 2. Nivel 4: 1
**e) ¿Cuantos elementos hay en el nivel 5?.Indica sus nombres** Sólo está el elemento terminal "Texto 1".
## Ejercicio 4
Dibujos.
## Ejercicio 5
Subido al git.