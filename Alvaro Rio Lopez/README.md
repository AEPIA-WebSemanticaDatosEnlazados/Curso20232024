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
se han seleccionado datos en relación a las multas de circulación tramitadas por el ayuntamiento de Madrid en el último mes. 
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

Es por ello que, como se indican en los puntos 1 y 2, la obtención de los datos es citada en la bibliografia de este documento 
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

* Elección del dominio de las URIs, cabe destacar que es un dominio a nivel teorico ya que no se tiene la capacidad de hosting necesaria:
    - En este caso el dominio es: http://multas-circulacion.es/
* Elección ruta de las URIs:
    - Ruta para términos ontológicos: http://multas-circulacion.es/ayuntamientomadrid/ontology/denunciante#
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

A partir del paso anterior se obtienen una serie de términos que nos permiten dar sentido a nuestros datos, estos términos son:

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
los términos definidos previamente y se aclaran las relaciones que deben haber entre los términos

<img width="600" height="300" alt="image" src="https://github.com/alvaro-rio/WebSemanticaCurso20232024/blob/main/Alvaro%20Rio%20Lopez/Images/Captura.JPG">

#### Búsqueda de ontologías y selección de ontologías

La busqueda de ontologías se ha centrado en https://schema.org. Schema.org es un proyecto de colaboración en la web que 
proporciona un conjunto de vocabularios de esquemas para estructurar datos en la web.

Esta ontología nos ha permitido encontrar una gran cantidad de 

| Términos             | URI                               |
|----------------------|-----------------------------------|
| Multa                | -                                 |
| Calificación         | https://schema.org/Rating         |
| Lugar                | https://schema.org/Place          |
| Fecha                | https://schema.org/Date           |
| Importe              | https://schema.org/MonetaryAmount |
| Descuento            | -                                 |
| Puntos               | https://schema.org/Integer        |
| Denunciante          | -                                 |
| Causa multa          | -                                 |
| Velocidad límite     | https://schema.org/Integer        |
| Velocidad infracción | https://schema.org/Integer        |
| Coordenadas          | -                                 |

Como se puede observar, siete de nuestros términos reciclados a partir de ontologías ya existentes, en este caso todas 
procendentes de **Schema.org**. Como se puede observar en la tabla anterior, hay ciertos términos a los cuales no se les ha 
encontrado ninguna ontología. 

Destaca el término **coordenadas**, en este caso se ha encontrado la ontología https://schema.org/GeoCoordinates
pero no es valida en este caso ya que Schema.org utiliza una métrica WGS84 para las coordenadas mientras que nuestros 
datos tienen una métrica ETRS89. Lo mismo ocurre con https://www.w3.org/2003/01/geo/

#### Implementación de la ontología






















## 5. Bibliografía
- [Origen de los datos: Ayuntamiento de Madrid](https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=fb9a498a6bdb9410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default) Datos de Septiembre 2023
-     