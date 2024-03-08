# **Multas de circulación**

Indice del trabajo:

1. Introducción
2. Proceso de transformación:
    * 2.1 Selección de la fuente de datos
    * 2.2 Análisis de los datos
    * 2.3 Estrategia de nombrado
    * 2.4 Desarrollo del vocabulario
    * 2.5 Proceso de transformación
    * 2.6 Enlazado
    * 2.7 Publicación

3. Aplicación y explotación
4. Conclusiones
5. Bibliografía

## 1. Introducción

Del catálogo de datos publicado en el [Portal web del Ayuntamiento de Madrid](https://www.madrid.es/portal/site/munimadrid), 
se han seleccionado datos en relación con las multas de circulación tramitadas por el ayuntamiento de Madrid en el último mes. 
Este trabajo tiene como objetivo la transformación de estos datos (.csv) en datos enlazados, para ello se aplicarán los 
conocimientos estudiados durante el curso. 

## 2. Proceso de transformación

### 2.1 Selección de la fuente de datos

Los datos que se van a transformar han sido descargados de la web [Datos abiertos](https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=fb9a498a6bdb9410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default). 
Este portal está dedicado a promover el acceso a los datos del gobierno municipal e impulsar el desarrollo de herramientas creativas 
para atraer y servir a la ciudadanía.

La descripción sobre dichos datos es: Un conjunto de datos que va incorporando todas las multas de circulación que el Ayuntamiento 
de Madrid tramita cada mes, con todo el detalle posible sobre cada una de ellas que permite la legislación de protección de datos. 
Se incluye información sobre la infracción cometida, su gravedad o el lugar donde se denunció. La información se ajusta a los datos 
existentes en el momento de la publicación, y no prejuzgan el resultado final de la tramitación del expediente sancionador, 
como consecuencia reclamaciones y/ o recursos de las personas denunciadas.

Los datos descargados se encuentran en formato .csv y se encuentran en la carpeta [Dataset](https://github.com/alvaro-rio/WebSemanticaCurso20232024/tree/main/Alvaro%20Rio%20Lopez/Dataset).

###  2.2 Análisis de los datos

- Los datos seleccionados tienen las siguientes condiciones de uso:
   * 1 Está prohibido desnaturalizar el sentido de la información.
   * 2 Debe citarse la fuente de los documentos objeto de la reutilización. Esta cita podrá realizarse de la siguiente manera: "Origen de los datos: Ayuntamiento de Madrid (o, en su caso, órgano administrativo, organismo o entidad de que se trate)"
   * 3 Debe mencionarse la fecha de la última actualización de los documentos objeto de la reutilización, siempre y cuando estuviera incluida en el documento original.
   * 4 No se podrá indicar, insinuar o sugerir que el Ayuntamiento de Madrid participa, patrocina o apoya la reutilización que se lleve a cabo con la información.
   * 5 No se podrá indicar, insinuar o sugerir que el Ayuntamiento de Madrid participa, patrocina o apoya la reutilización que se lleve a cabo con la información.
   * 6 En caso de información anonimizada por protección de datos personales u otros motivos, está expresamente prohibido realizar labores de re-identificación de personas a partir de estos datos y otras fuentes de datos e información posibles, pasadas, actuales o futuras.

Es por ello que, como se indican en los puntos 1 y 2, la obtención de los datos es citada en la bibliografía de este documento 
indicando su origen y su fecha de obtención. Para mayor detalle sobre las condiciones de uso se puede revisar la web 
[Condiciones generales para la modalidad general de puesta a disposición de los documentos reutilizables del Ayuntamiento de Madrid](https://datos.madrid.es/portal/site/egob/menuitem.3efdb29b813ad8241e830cc2a8a409a0/?vgnextoid=108804d4aab90410VgnVCM100000171f5a0aRCRD&vgnextchannel=b4c412b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default)

La estructura de los datos y un comentario explicando el objetivo de cada campo se detalla en la siguiente tabla:

|  Nombre campo | Tipo dato | Rango de valores                                                                                     | Comentario                                                                                                                                                                                                            |
|---------------|-----------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CALIFICACION  | STRING    | [LEVE, GRAVE, MUY GRAVE]                                                                             | Indica la gravedad de la infracción, clasificando la misma en tres posibles campos niveles: leve, grave o muy grave.                                                                                                  |
| LUGAR         | STRING    | Cualquier posible string                                                                             | Dirección donde se produjo la infracción.                                                                                                                                                                             |
| ANIO          | INTEGER   | [9]                                                                                                  | Indica el mes en el que se produjo la infracción, al haber descargado los datos solo de septiembre de 2023 este campo solo refleja el valor 9 (septiembre).                                                           |
| LUGAR         | INTEGER   | [2023]                                                                                               | Indica el año en el que se produjo la infracción, en este caso solo se refleja el valor 2023.                                                                                                                         |
| HORA          | DATE      | [00:00,...,23:59]                                                                                    | Hora en la que se produjo la infracción.                                                                                                                                                                              |
| IMP_BOL       | FLOAT     | [30.00, 50.00, 60.00, 90.00, 100.00, 200.00, 300.00, 400.00, 500.00, 1000.00,]                       | Valor económico asociado a la infracción.                                                                                                                                                                             |
| DESCUENTO     | STRING    | [SI, NO]                                                                                             | Indica si se aplico o no el descuento del 50% por el pronto pago de la multa.                                                                                                                                         |
| PUNTOS        | INTEGER   | [0, 2, 3, 4, 6]                                                                                      | Indica el número de puntos que se retiran del carnet de conducir del infractor.                                                                                                                                       |
| DENUNCIANTE   | STRING    | [AGENTES DE MOVILIDAD, MEDIOS DE CAPTACIÓN DE IMAGEN, MOVILIDAD RADAR, POLICIA MUNICIPAL, SACE, SER] | Indica quien es el denunciante, es decir, quien detectó la infracción producida por el conductor.                                                                                                                     |
| HECHO-BOL     | STRING    | [...]                                                                                                | Descripción del motivo de la sanción.                                                                                                                                                                                 |
| VEL_LIMITE    | INTEGER   | [20, 30, 40, 50, 60, 70, 90, NULL]                                                                   | Indica la velocidad límite la via donde se produjo la infracción. Este campo solo tiene valores en las multas producidas por un exceso de velocidad.                                                                  |
| VEL_CIRCULA   | INTEGER   | [25,...,155]                                                                                         | Indica la velocidad de circulación del vehiculo sancionado por sobrepasar el límite de velocidad establecido. Este campo, al igual que el campo VEL_LIMITE, solo tiene valores en las multas por exceso de velocidad. |
| COORDENADA-X  | FLOAT     | [4496.72,...,439301.79]                                                                              | Indica la coordenada X para facilitar la feorreferenciación en sistema de referencia ETRS89.                                                                                                                          |
| COORDENADA-Y  | FLOAT     | [44678.77,...,4483067.92]                                                                            | Indica la coordenada Y para facilitar la feorreferenciación en sistema de referencia ETRS89.                                                                                                                          |

### 2.3. Estrategia de nombrado

Para seleccionar la estrategia de nombrado de los datos haremos uso de # y /, como se ha visto en clase. Concretamente, 
utilizaremos '#' para la redirección a los elementos que no se espera que tengan muchos cambios y '/' para los datos 
que son dinámicos:

* Elección del dominio de las URIs, cabe destacar que es un dominio a nivel teórico, ya que no se tiene la capacidad de hosting necesaria:
    - En este caso el dominio es: http://multas-circulacion.es/
* Elección ruta de las URIs:
    - Ruta para términos ontológicos: http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#
    - Ruta para individuos: http://multas-circulacion.es/ayuntamientomadrid/resource/
* Elección patrones para clases, propiedades e individuos:
    - Patrón para términos ontológicos: http://multas-circulacion.es/ayuntamientomadrid/ontology/denunciante#<term_name>
      
      Donde **<term_name>** hace referencia a los dintintos términos ontológicos disponibles.
    - Patrón para individuos: http://multas-circulacion.es/ayuntamientomadrid/resource/<resource_name>

      Donde **<resource_name>** hace referencia a los dintintos individuos disponibles.


### 2.4 Desarrollo del vocabulario

Como hemos visto en clase, el desarrollo de un vocabulario consta de los siguientes pasos:

* 1 - Definición de requisitos
* 2 - Extracción de términos
* 3 - Conceptualización de la ontología
* 4 - Búsqueda de ontologías
* 5 - Selección de ontologías
* 6 - Implementación de la ontología
* 7 - Evaluación de la ontología


#### Definición de requisitos

En este caso se especifican los requisitos no funcionales y los funcionales para un correcto desarrollo ontológico. 
Los no funcionales son:

1. Reutilización de otros vocabularios.
2. Debe ser escalable para permitir añadir nueva información cuando sea neceario:
3. Vocabulario en formato compatible con Open Refine.

Los requisitos funcionales son obtenidos haciendo Preguntas de Competencia, en este caso son:

| Pregunta de competencia | Pregunta                                                 |
|-------------------------|----------------------------------------------------------|
| PC1                     | ¿Calificación de la multa?                               |
| PC2                     | ¿Lugar donde se produjo la multa?                        |
| PC3                     | ¿Fecha en la que se produjo la infracción?               |
| PC4                     | ¿Importe económico de la multa?                          |
| PC5                     | ¿Se aplicó descuento a la multa?                         |
| PC6                     | ¿Puntos retirados al conductor?                          |
| PC7                     | ¿Quien denunció la infracción?                           |
| PC8                     | ¿Causa de la multa?                                      |
| PC9                     | ¿Velocidad límite de la vía?                             |
| PC10                    | ¿Velocidad de circulación del infractor?                 |
| PC11                    | ¿Coordenadas geográficas donde se produjo la infracción? |


#### Extracción de términos

A partir del paso anterior se obtienen una serie de términos que nos permiten dar sentido a nuestros datos, estos 
términos son:

| Términos             | Descripción                                                               |
|----------------------|---------------------------------------------------------------------------|
| Calificación         | Calificación asignada a la infracción.                                    |
| Lugar                | Indicar la calle de madrid donde se produjo la infracción.                |
| Fecha                | Hora, mes y año en el que se produjo la infracción.                       |
| Importe              | Cantidad económica que debe pagar el infractor.                           |
| Descuento            | Indicativo de si se aplico descuento al importe o no.                     |
| Puntos               | Número de puntos retirados del carnet de conducir del infractor.          |
| Denunciante          | Quien o que elemento pone la multa.                                       |
| Causa multa          | Pequeña descripción de porque se produjo la multa.                        |
| Velocidad límite     | Velocidad máxima permitida en la via en la que se sanciona la infracción. |
| Velocidad infracción | Velocidad a la que circulaba el vehiculo infractor.                       |
| Coordenadas          | Coordenadas geográficas donde se produjo la infracción.                   |


#### Conceptualización de la ontología

A continuación se muestra un primer esquema con la estructura de nuestra ontología. Para este esquema se han utilizado 
los términos definidos previamente y se aclaran las relaciones que debe haber entre los términos

<img width="600" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/estructura.JPG">

Se puede observar que la multa tiene una calificación, la cual puede ser muy grave, grave o leve, un lugar, unas 
coordenadas que constan de longitud y latitud, un importe al cual se le puede haber aplicado un descuento o no, una 
causa de la multa, un denunciante y una fecha.

#### Búsqueda de ontologías y selección de ontologías

La busqueda de ontologías se ha centrado en https://schema.org. Schema.org es un proyecto de colaboración en la web que 
proporciona un conjunto de vocabularios de esquemas para estructurar datos en la web.

Esta ontología nos ha permitido encontrar una gran cantidad de 

| Términos             | URI                               |
|----------------------|-----------------------------------|
| Multa                | -                                 |
| Calificación         | https://schema.org/rating         |
| Lugar                | https://schema.org/place          |
| Lugar                | https://schema.org/city           |
| Fecha                | https://schema.org/date           |
| Importe              | https://schema.org/monetaryAmount |
| Descuento            | -                                 |
| Puntos               | https://schema.org/integer        |
| Denunciante          | -                                 |
| Causa multa          | -                                 |
| Velocidad límite     | https://schema.org/integer        |
| Velocidad infracción | https://schema.org/integer        |
| Coordenadas          | -                                 |

Como se puede observar, siete de nuestros términos reciclados a partir de ontologías ya existentes, en este caso todas 
procendentes de **Schema.org**. Como se puede observar en la tabla anterior, hay ciertos términos a los cuales no se les ha 
encontrado ninguna ontología. 

Destaca el término **coordenadas**, en este caso se ha encontrado la ontología https://schema.org/GeoCoordinates,
pero no es válida en este caso, ya que Schema.org utiliza una métrica WGS84 para las coordenadas mientras que nuestros 
datos tienen una métrica ETRS89. Lo mismo ocurre con https://www.w3.org/2003/01/geo/

#### Implementación de la ontología

La implementación de la ontología se realizará en el apartado 2.5 con la ayuda de la herramienta OpenRefine.

#### Evaluación de la ontología

Para la evaluación de la ontología se utiliza la herramienta [OOPS!](https://oops.linkeddata.es/index.jsp). Esta 
herramienta permite escribir la ontología, en su formato rdf, directamente en la web proporcionando la evaluación de la 
misma. Se realiza esto una primera vez y se obtiene el siguiente resultado:

<img width="873" height="713" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/oops1.JPG">

Se analizan cada uno de los pitfalls y se solucionan de la siguiente manera:

1. Se define la URI "http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#Multa" como tipo rdfs:Class.
   
   <img width="129" height="73" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/class.JPG">
   
2. Se añade un nuevo tipo llamado "owl:Ontology".
3. Se añade el prefijo base, teniendo como URI "http://multas-circulacion.es/ayuntamientomadrid/resource/".

   <img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/prefijos.JPG">

Una vez realizados estos tres cambios en el esqueleto RDF se vuelve a evaluar la ontología, añadiendo el archivo rdf 
como texto plano a la herramienta [OOPS!](https://oops.linkeddata.es/index.jsp). Se obtienen los siguientes resultados:

<img width="805" height="182" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/oops2.JPG">

Se continúa investigando como solucionar el pitfall de la licencia. Para poder solucionarlo hay que hacer una modificación 
de los metadatos. No se consigue realizar, por lo tanto, se especifica lo siguiente:

Tanto los datos como la ontología misma publicada en este repositorio público tiene una licencia CC BY 4.0, dando todos 
los créditos necesarios al [Ayuntamiento de Madrid](https://www.madrid.es/portal/site/munimadrid) por ser la fuente de 
todos los datos utilizados para este proyecto.

Una vez terminada la evaluación, se modifican los archivos que se encuentran en [DataGenerate.zip](https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/DataGenerate.zip),
ya que, debido a la evaluación, se ha modificado el esqueleto RDF para así mejorarlo.





### 2.5 Proceso de transformación

Como ya se ha mencionado previamente, los datos se encuentran en un archivo csv, en concreto se tienen 213569 filas x 
14 columnas. Para poder trabajar de forma correcta con los datos se deben pre-procesar se le han aplicado los 
siguientes cambios:

**1.** Con los datos que se tienen es facil darse cuenta de que no se tiene ningún identificador único para cada una de las 
filas, tanto el lugar, como el importe o incluso la hora se pueden ver repetidos. Para solucionar esto se ha añadido una
nueva columna llamada **id**. Esta columna se ha creado desde la opción de **Edit column -> Add column based on this column**
y, posteriormente, seleccionando el lenguaje Python/Jython, se ejecuta el siguiente código:
```python
import random

numero_aleatorio = random.randint(1, 10000000)

print(numero_aleatorio)
```
  Este codigo genera un número aleatorio entre el 1 y el 10.000.000, esto nos da una posibilidad de repetición del 2.1%. 
  Se comprueba y se verifica que no hay números repetidos por lo que esta nueva columna llamada id nos sirve como identificador
  único para cada fila.


**2.** En los datos encontramos 3 columnas distintas para hacer indicar el momento en el que se produjo la infracción 
(MES, ANIO, HORA). Es por ello que se decide unificar estas tres columnas en una unica columna (llamada **FECHA**) y así
poder obtener un formato fecha correcto. Para ello, al igual que en el cambio anterior, se aplica la funcionalidad 
**Edit column -> Add column based on this column** y se ejecuta el siguiente código con el lenguaje Python/Jython:

```python
from datetime import datetime

hora = cells["HORA"].value

cadena = hora.replace(".",":") + " 0" + cells["MES"].value + "-" + cells["ANIO"].value

fecha_hora = datetime.strptime(cadena, "%H:%M %m-%Y")

deseado = fecha_hora.strftime("%Y-%m-%d %H:%M:%S")

return deseado
```
Este código devuelve un formato date correcto, por ejemplo: "2023-09-01 08:41:00". Posteriormente se selecciona la opción
**Edit cells -> Common transforms -> To date**, así se consigue que los datos sean formato date y no solo un texto con la 
estructura igual que un date.

Cabe destacar que, al no tener información del día en el que se produjo la infracción, todas las fechas indican el día 01.

<img width="80" height="200" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/fechas.JPG">


**3.** Las columnas IMP_BOL, PUNTOS, VEL_LIMITE, VEL_CIRCULA, son números pero en los datos originales se encuentran en 
formato texto, es por ello que se selecciona la opción **Edit cells -> Common transforms -> To number**. Con esto se 
consigue que estas columnas pasen a ser números.

<img width="800" height="200" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/numbers.JPG">

**4.** Se añade una columna nueva llamada **CIUDAD**. El objetivo de añadir
esta nueva columna es poder asociar nuestros datos, es decir, nuestras multas, al resto de elementos que encontramos en 
la red. Esta columna usa https://schema.org/city por lo que es una conexión directa a otros posibles datos de la red.
Se vuelve a seleccionar **Edit column -> Add column based on this column** y, en este caso con el lenguaje GREL, se ejecuta:
```python
"Madrid"
```
Por lo que, en todas las filas su valor va a ser "Madrid".

**5.** Tanto en la columna LUGAR como en la columna HECHO_BOL encontramos valores que hacen referencia a lo mismo, pero no 
están escritos exactamente igual, por ejemplo: en la columna LUGAR encontramos "JACOMETREZO 13" y "JACOMETREZO, 13", hay
una coma de diferencia. Estos pequeños detalles pueden infundir en posibles errores al implementar del esqueleto.

Para solucionar este problema, se hace uso de la función "Cluster and edit", esta funcionalidad permite unificar estas
diferencias que encontramos en las columnas LUGAR y HECHO_BOL. Se selecciona **Edit cells -> Cluster and edit...** y se 
despliegan las siguientes ventanas:

<img width="550" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/lugares.JPG">

<img width="550" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/hecho-bol.JPG">

Se seleccionan todas las opciones posibles y se presiona en "Merge selected & re-cluster". Unificando así las diferencias
mencionadas.

**6.** En el caso de las coordenadas donde se produjo la infracción, se encuentran separadas en dos columnas, COORDENADA-X y
COORDENADA-Y. Como mejora para los datos se añade una nueva columna nueva llamada **COORDENADAS** para representar ambas
coordenadas juntas. Esto se realiza seleccionando **Edit column -> Add column based on this column** y ejecutando:

```python
coor_x = cells["COORDENADA-X"].value
coor_y = cells["COORDENADA-Y"].value

return "(" + coor_x.strip() + "," + coor_y.strip()  +")"
```
Obtienendo así la nueva columna con ambas coordenadas con el formato: (4419.57,44754.23), (4419.58,44754.20), 
(4419.56,44754.20), etc.

**7.** El último cambio que se le ha realizado a los datos es, en todas las columnas que son formato text, se les aplica 
el siguiente codigo:

```python
return value.strip()
```

El objetivo de este código es aplicarle la funcion **strip()** de python a todos los textos para así evitar ensuciar el
esqueleto con espacios en blanco no necesarios. El objetivo de esta función es eliminar los espacios en blanco que se 
encuentren en el principio y/o en el final del texto. Esto se realiza en las columnas CALIFICACION, LUGAR, DENUNCIANTE, 
HECHO-BOL, COORDENADA-X y COORDENADA-Y.

Una vez aplicados todos estos cambios, los datos están completos y tienen la siguiente estructura:

<img width="800" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/datos_final.JPG">

El siguiente paso es construir el RDF, para ello se deben añadir los distintos prefijos. Todo esto ha sido posible gracias
a la extensión de "RDF extension", en este caso la versión 1.4.0. La instalación de dicha extensión es sencilla, desde la
propia página oficial de OpenRefine se puede encontrar la extensión para RDF en formato zip.

Se debe descargar este archivo zip y, en la ruta donde se encuentre el programa se debe crear una nueva carpeta llamada 
**extensions**. Dentro de esta carpeta se debe descomprimir el archivo zip. Una vez hecho esto, se vuelve a ejecutar OpenRefine
y aparece la opción de RDF necesaria para poder continuar.

Para continuar con la construcción del esqueleto RDF presionamos la opción **RDF -> Edit RDF skeleton** donde se encuentran 
las herramientas necesarias para completar nuestro esqueleto:


<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/edit_skeleton_empty.JPG">

Lo primero que se debe hacer es añadir los prefijos que se van a necesitar, estos prefijos han sido definidos en el 
apartado 2.4. En este caso son:

- onto -> http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#
- schema -> https://schema.org/)

En el caso del prefijo **onto**, al no ser un vocabulario existente, se debe seleccionar la opción "Add prefix only". Por 
otro lado, en el caso de **schema**, seleccionamos la opción "Try fetching vocabulary terms from the Web" (la cual viene por
defecto), esta opción nos importará toda la ontología schema, la cual ya se encuentra publicada.

Además de definir los prefijos necesarios, se debe modificar la base URI para el nombrado de individuos, en este caso 
se pone la URI: http://multas-circulacion.es/ayuntamientomadrid/resource/

El siguiente paso es definir el tipo de los individuos, seleccionamos la opción "Add type" y definimos que el tipo es:
**onto:Multa**. Con esto se está indicando que todos nuestros individuos son multas.

Para continuar, para poder definir las URIs, seleccionamos la opción "(Row index) URI". Es en este momento donde se encuentra
utilidad a la columna **id** (la cual ha sido añadida a los datos como se explica en el apartado anterior). Se selecciona la
columna **id** y especificamos el valor que debe tener la expresión como se ve en la siguiente imagen:

<img width="350" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/uri.JPG">

Esto nos asegura unas URIs únicas para cada recurso. Obteniendo así URIs con la siguiente estructura:

http://multas-circulacion.es/ayuntamientomadrid/resource/Multa/7841835

Por último, se deben añadir propiedades a los recursos. Como ya hemos mencionado previamente se van a tener dos tipos de
propiedades, las basadas en la ontología que se está creando llamada **onto** y la ontología **schema**. Después de 
todos estos pasos, el esqueleto se ve de la siguiente manera:

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/skeleton.png">

Una vez aplicado todo esto se descarga el RDF tanto en formato Turtle como en formato RDF/XML desde la opción "Export", 
que genera dos archivos, **202309detalle-csv.rdf** y **202309detalle-csv.ttl**. Estos archivos se encuentran en DataGenerate.zip.

Se habría preferido crear un directorio (al igual que existe Images, Dataset, etc.) pero no ha sido posible por el tamaño
de los archivos, en el caso del archivo .rdf, se encuentran más de 3.200.000 líneas en el documento. Cuando se intenta hacer un push salta un error, ya que los archivos superan los 100.00 MB, es por eso 
que se comprime el directorio y se sube de esa manera.

### 2.6 Enlazado

Con los datos que se tienen, no hay ningún campo que nos aporte un enlazado cooherente, no tendría sentido enlazar estos
datos respecto a un número como puedo ser el importe de la multa o respecto a una velocidad. Es por ello que se añadió la
columna **CIUDAD**.

Como ya se ha mencionado previamente, la columna **CIUDAD** tiene siempre el valor "Madrid". Esto permite enlazar las 
multas a la ciudad de Madrid y, a su vez, saber la calle exacta donde se produjo la infracción, al importe que tiene, 
etc (información que se obtiene de los datos con el esqueleto RDF generado).

El proceso de enlazado se puede hacer desde la herramienta OpenRefine. Se selecciona la columna **CIUDAD** y posteriormente,
se selecciona la funcionalidad **Reconcile -> Start reconciling...**. Lo que despliega la siguiente ventana:

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/reconcile.JPG">

En este caso se puede seleccionar la opción "Wikidata reconci.link (en)" y no es necesario añadir un nuevo servicio de 
reconciliación. Esta reconciliación asociará nuestro campo **CIUDAD** a través de [Wikidata](https://datos.gob.es/es/blog/wikidata-una-base-de-datos-de-conocimiento-libre-y-abierto#:~:text=%C2%BFQu%C3%A9%20es%20wikidata%3F,datos%20de%20otros%20repositorios%20digitales.). 
Una vez seleccionada la opción "Wikidata reconci.link (en)", aparecen todas las posibles opciones para 
reconciliar a partir de la columna **CIUDAD** como se muestra a continuación.

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/reconcile_ciudad.JPG">

Una vez completado el proceso de reconciliación, se puede visualizar el resultado obtenido. Para ello se selecciona la 
función **Edit column -> Add column based on this column** en la columna **CIUDAD**. Dentro de las opciones para crear 
la columna, se indica que el resultado debe ser de la forma "http://www.wikidata.org/entity/ + cell.recon.match.id" y 
que el nombre de la columna es **CIUDAD-URI**. En este caso, tras aplicar la reconciliación junto con wikidata, 
el resultado final es: "http://www.wikidata.org/entity/Q2807".

Para que el proceso de reconciliación se haya realizado correctamente toda la columna **CIUDAD-URI** debe tener el mismo 
valor, ese valor es "http://www.wikidata.org/entity/Q2807". Se comprueba que así es por lo que la reconciliación se ha 
realizado correctamente.

Al haber generado una columna más (**CIUDAD-URI**), se agrega una nueva propiedad nueva para esta columna. Se define la 
clase a través de "schema:city" y, con la propiedad "owl:sameAS". Hacer esto permite conectar la instancia "Madrid" de 
Wikidata con nuestra instancia "Madrid", la cual se encuentra en la columna **CIUDAD-URI**. Todo este proceso se hace 
desde la ventana de **Edit RDF skeleton** como se muestra a continuación:

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/municipio_uri.JPG">


### 2.7 Publicación

Una vez completado este proceso se actualiza el esqueleto RDF y se actualizan los archivos almacenados en "DataGenerate.zip".
En el archivo zip se encuentra el archivo RDF/XML y el archivo Turtle con el esqueleto RDF actualizado tras haber añadido
la nueva propiedad y la nueva clase. Como se ha explicado previamente, el directorio se encuentra comprimido en formato
zip, ya que, ambos archivos (.ttl y .rdf) superan el tamaño de 100.00 MB y se produce un error al querer subirlos al
repositorio sin comprimir.

Para continuar la publicación correcta de los datos vamos a usar la herramienta [datahub.io](https://datahub.io/). Tras 
investigar su funcionamiento, se descubre que la forma correcta de publicar los datos es desde [old.datahub.io](https://old.datahub.io/).
Por lo que, se crea un usuario y se presiona la opción "Publish data for free":

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/old_datahub.JPG">

Al hacer eso nos aparecen los pasos a seguir para publicar los datos:

<img width="450" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/datahub_steps.JPG">

Al intentar generar un ticket solicitando la creación de una nueva organización se genera un bucle infinito y no se es capaz
de solicitar dicha creación. Es por eso que la solución que se plantea es mantener los datos públicos en este repositorio,
concretamente en el directorio [FinalProject](https://github.com/alvaro-rio/WebSemanticaCurso20232024/tree/main/Alvaro%20Rio%20Lopez/FinalProject).

Es obvio que no es la solución deseada, ya que, aunque los datos son públicos, no son fáciles de encontrar ni cumplen la 
funcionalidad que se busca de ellos. El objetivo deseado sería poder dejarlos públicos en el repositorio 
[datahub.io](https://datahub.io/) lo que permitiría que el dataset este visible y se pueda pintar en la nube de 
datos enlazados abiertos.

## 3. Aplicación y explotación

Una vez llegado a este punto, los datos que se encontraban en formato csv en un inicio, han sido transformados a formato
rdf y han sido correctamente enlazados. El siguiente paso es el uso de estos datos y la explotación de los mismos.

Para ello se van a realizar consultas de [SPARQL](https://datascience.recursos.uoc.edu/es/sparql/#:~:text=SPARQL%20es%20un%20lenguaje%20para,los%20elementos%20y%20sus%20relaciones). 
Estas consultas se van a realizar en [Apache Jena Fuseki](https://jena.apache.org/index.html). Fuseki proporciona un 
punto de acceso centralizado para ejecutar consultas SPARQL y actualizar conjuntos de datos RDF a través de la web. 
Estas consultas generan como respuestas archivos csv con los datos generados a partir de la query SPARQL.

Es importante matizar que, el archivo rdf que se sube a [Apache Jena Fuseki](https://jena.apache.org/index.html), no es
el archivo completo descargado de OpenRefine. Esto es debido al tamaño del archivo, [Apache Jena Fuseki](https://jena.apache.org/index.html) 
no permite archivos tan grandes por lo que, aunque los csv de respuesta no son completos, si permite ver las posibles 
aplicaciones y querys que se pueden generar.

A continuación se muestran algunos ejemplos de querys SPARQL. Los csv de respuesta se encuentran en [CsvQuerys](https://github.com/alvaro-rio/WebSemanticaCurso20232024/tree/main/Alvaro%20Rio%20Lopez/CsvQuerys).


* Consulta 1: Obtener todas las multas que tienen calificación "MUYGRAVE":
```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX onto: <http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#>
PREFIX schema: <http://schema.org/>

SELECT ?multa ?rating ?place ?date ?monetaryAmount ?descuento ?denunciante ?causa ?coordenadas ?city
WHERE {
    ?multa a onto:Multa ;
        schema:rating ?rating ;
        schema:place ?place ;
        schema:date ?date ;
        schema:monetaryAmount ?monetaryAmount ;
        onto:hasDescuento "SI";
        onto:hasDenunciante ?denunciante ;
        onto:hasCausa ?causa ;
        onto:hasCoordenadas ?coordenadas ;
        schema:city ?city .
}
```

* Consulta 2: Obtener todas las multas en unas coordenadas concretas:
```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX onto: <http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#>
PREFIX schema: <http://schema.org/>

SELECT ?multa ?rating ?place ?date ?monetaryAmount ?descuento ?denunciante ?causa ?coordenadas ?city
WHERE {
    ?multa a onto:Multa ;
        schema:rating ?rating ;
        schema:place ?place ;
        schema:date ?date ;
        schema:monetaryAmount ?monetaryAmount ;
        onto:hasDenunciante ?denunciante ;
        onto:hasCausa ?causa ;
        onto:hasCoordenadas ?coordenadas ;
        onto:hasCoordenadas "(4405.00,44798.75)" ;
        schema:city ?city .
}
```

* Consulta 3: Obtener todas las multas con importe mayor a 200€ y que sean de calificación "GRAVE":
```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX onto: <http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#>
PREFIX schema: <http://schema.org/>

SELECT ?multa ?rating ?place ?date ?monetaryAmount ?descuento ?denunciante ?causa ?coordenadas ?city
WHERE {
    ?multa a onto:Multa ;
        schema:rating ?rating ;
        schema:place ?place ;
        schema:date ?date ;
        schema:monetaryAmount ?monetaryAmount ;
        onto:hasDenunciante ?denunciante ;
        onto:hasCausa ?causa ;
        onto:hasCoordenadas ?coordenadas ;
        schema:city ?city .
    FILTER (?monetaryAmount > 200 && ?rating = "GRAVE")
}
```


* Consulta 4: Obtener todos los lugares donde se han puesto multas:
```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX onto: <http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#>
PREFIX schema: <http://schema.org/>

SELECT DISTINCT ?place
WHERE {
  ?multa a onto:Multa ;
        schema:place ?place .
}
```

* Consulta 5: Obtener número de multas puestas por cada tipo de denunciante:
```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX onto: <http://multas-circulacion.es/ayuntamientomadrid/ontology/multa#>
PREFIX schema: <http://schema.org/>

SELECT ?denunciante (COUNT(?denunciante) as ?count)
WHERE {
  ?multa a onto:Multa ;
        onto:hasDenunciante ?denunciante .
}
GROUP BY ?denunciante
```
Estas querys muestran ejemplos sobre un número ilimitado de información que se puede obtener a partir de los datos enlazados.
Por ejemplo, el ayuntamiento de madrid puede utilizar estos datos para ver en que lugares se comenten mayor número de 
infracciones, o las más graves, para así poder mejorar esos lugares o poner mayor vigilancia. 

Otro ejemplo sería utilizar las coordenadas que ya conocemos de las multas para así poder geo localizarlas y observar en
que lugares no hay ningún tipo de vigilancia y, a lo mejor, es necesario añadir.

En resumen, el aprovechamiento de los datos enlazados ofrece oportunidades significativas para mejorar la calidad de 
vida en entornos urbanos mediante una gestión más inteligente y centrada en los ciudadanos.

## 4. Conclusiones

## 5. Bibliografía
- [Origen de los datos: Ayuntamiento de Madrid](https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=fb9a498a6bdb9410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default) Datos de Septiembre 2023
- [GREL](https://openrefine.org/docs/manual/grelfunctions)
- [Schema.org](https://schema.org/)
- [RDF extension](https://github.com/stkenny/grefine-rdf-extension)
- [Wikidata](https://datos.gob.es/es/blog/wikidata-una-base-de-datos-de-conocimiento-libre-y-abierto#:~:text=%C2%BFQu%C3%A9%20es%20wikidata%3F,datos%20de%20otros%20repositorios%20digitales.)
- [Datahub.io](https://datahub.io/)
- [Old.datahub.io](https://old.datahub.io/)
- [OOPS!](https://oops.linkeddata.es/index.jsp)
- [SPARQL](https://datascience.recursos.uoc.edu/es/sparql/#:~:text=SPARQL%20es%20un%20lenguaje%20para,los%20elementos%20y%20sus%20relaciones)







