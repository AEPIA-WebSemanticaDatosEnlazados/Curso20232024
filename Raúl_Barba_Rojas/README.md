# Memoria del proyecto final

Asignatura: Web Semántica y Datos Enlazados.

Autor: Raúl Barba Rojas.

## Introducción

En este documento se presenta la memoria del proyecto final de esta asignatura sobre la web semántica y los datos enlazados del *Máster Universitario en Investigación en Inteligencia Artificial de la AEPIA*.

Dicho proyecto consiste en seleccionar y transformar un conjunto de datos, para obtener como resultado de las diferentes tareas aplicadas en este proceso un conjunto de datos enlazados, siguiendo la metodología estudiada en la asignatura. Para describir de forma efectiva el proceso realizado para lograr llevar a cabo este proceso de transformación de datos tradicionales a datos enlazados, este documento se estructura como sigue:

- **Proceso de transformación**: esta primera sección contiene todo el proceso de transformación de los datos (originalmente no enlazados) hacia un conjunto de datos enlazados, describiendo mediante subsecciones todas las etapas de este proceso, como podrían ser la selección de la fuente de datos, el análisis de los mismos, o incluso la creación de una ontología que de soporte a los datos (considerando los vocabularios ya existentes de la web semántica). 

- **Aplicación y explotación**: esta segunda sección contiene el proceso de aplicación y explotación de los datos enlazados generados en el proceso anterior. Así, es esta sección la que describe el prototipo funcional de aplicación que accede y explota los datos enlazados generados con anterioridad.

- **Conclusiones**: tras lo anterior, se ofrece una sección de conclusiones y lecciones aprendidas durante el desarrollo del proyecto final, a modo de resumen sobre todo el proceso realizado en la práctica.

- **Bibliografía**: la sección final contiene recursos bibliográficos empleados para el desarrollo de la práctica en cualquiera de los aspectos anteriores, desde el proceso de transformación hasta la propia explotación de los datos enlazados generados.

## Proceso de transformación

En esta sección de la memoria se describe detalladamente el proceso seguido para la transformación de un conjunto de datos no enlazado en un conjunto de datos enlazados. En la práctica, este proceso requirió la realización de diferentes tareas, de modo que esta sección se organiza en diferentes subsecciones:

- **Selección de la fuente de datos**: el primer paso del proceso de transformación realizado consistió en la selección de la fuente de datos que sería transformada a datos enlazados, interconectados con el resto de la web semántica. Así, en esta subsección se puede encontrar el conjunto de datos empleado, así como su origen.

- **Análisis de datos**: tras seleccionar el conjunto de datos a transformar, se llevó a cabo un proceso de análisis sobre los mismos explicando el tipo de licencia de los datos, así como el tipo de licencia del conjunto de datos enlazados que se obtuvo mediante este proceso. Este análisis de datos incluyó también el análisis necesario para obtener la información necesaria sobre el conjunto de datos para poder llevar a cabo su transformación y explotación de manera adecuada.

- **Estrategia de nombrado**: en esta otra subsección se describe la estrategia de nombrado empleada para el desarrollo de este proceso. Así, los diferentes elementos del vocabulario, así como las instancias del conjunto de datos enlazados generado, siguen la estrategia de nombrado definida en esta subsección.

- **Desarrollo del vocabulario**: esta subsección contiene toda la información relacionada con la creación del vocabulario necesario para dar soporte a los datos y poder crear el conjunto de datos enlazados. En este proceso se tuvieron también en cuenta aquellos vocabularios ya existentes en la web semántica, para re-utilizar aquellas clases y/o propiedades que ya hayan sido creadas en otros vocabularios ya existentes.

- **Proceso de transformación**: tras lo anterior, se llevó a cabo un proceso de transformación de los datos orientado a limpiar los datos y adecuarlos a los requisitos necesarios para una explotación satisfactoria de los mismos. Así, toda la estrategia y desarrollo de tareas necesarias para limpiar los datos se describen en esta subsección.

- **Enlazado**: en esta subsección se describe la forma en la que se llevó a cabo el enlazado de los datos, indicando con qué fuentes externas se han enlazado los datos, así como la herramienta y el proceso seguido para enlazar los datos.

- **Publicación**: TBD


### Selección de la fuente de datos

La selección de la fuente de datos para la realización de este proceso de generación de datos enlazados se basó en una búsqueda de conjuntos de datos que satisfacieran una serie de requisitos definidos:

1. **Conjunto de datos del dominio socio-cultural**, y más concretamente del dominio de aspectos culturales y de ocio.

2. **Conjunto de datos disponibles y actualizados en la historia reciente**, para poder manejar datos cuya explotación tenga algún interés.

3. **Conjunto de datos en formato procesable automáticamente**, de modo que no haga falta una creación manual del conjunto de datos origen para llevar a cabo el proceso de enlazado (lo que facilita y reduce considerablemente el tiempo necesario para poder llevar a cabo el proyecto).

4. **Conjunto de datos que permita ser enlazado con vocabularios ya existentes en la web semántica**. Este requisito no necesariamente implica que todas las clases a generar del vocabulario sean reutilizables de otros ya existentes para crear los enlaces (por ejemplo), sino que más bien se refiere a que sea posible crear algún enlace con conjuntos de datos existentes, y que las entidades puedan ser lo más genéricas posibles para facilitar la **visibilidad** del conjunto de datos enlazados a generar mediante el proceso.

Estos requisitos fueron definidos con el objetivo de llevar a cabo un proyecto lo más realista posible, con datos reales, disponibles y procesables automáticamente, y que puedan ser fácilmente accesibles y visibles en la web semántica. De forma adicional, se buscó la utilización de un conjunto de datos de un dominio que fuera de interés para el desarrollador del proyecto ([Raúl Barba Rojas](https://github.com/RaulBarbaRojas)), por lo que también se restringió el abanico de conjuntos de datos a emplear en base a si trataban temáticas relacionadas con ocio y/o deporte, mis temas de interés.

Considerando los requisitos especificados con anterioridad, se seleccionaron los siguientes conjuntos de datos, pertenecientes a la página web oficial de datos abiertos del Cabildo de Tenerife y del sector público insular (con licencia CC BY 4.0, tal y como se describe en la sección de análisis de los datos):

- **Centros educativos y culturales en Tenerife**: un conjunto de datos sobre la localización de centros educativos y culturales en la ciudad de Tenerife. Este conjunto de datos se encuentra accesible en Internet en el [siguiente enlace](https://datos.tenerife.es/es/datos/conjuntos-de-datos/centros-educativos-y-culturales-en-tenerife?return=aHR0cHM6Ly9kYXRvcy50ZW5lcmlmZS5lcy9lcy9kYXRvcy9jb25qdW50b3MtZGUtZGF0b3M=), y el titular de los datos es el Cabildo de Tenerife (aunque estos aspectos se detallan completamente en la sección de Análisis de datos). Los datos se encuentran disponibles y descargables en CSV, formato que permite un procesado automático de los mismos, por lo que satisfacen todas las restricciones explicitadas anteriormente.

- **Centros deportivos y de ocio en Tenerife**: un conjunto de datos sobre la localización de centros deportivos y de ocio en esa misma ciudad. Es un conjunto de datos análogo al anterior, cuyo titular es nuevamente el Cabildo de Tenerife, datos abiertos bajo la misma licencia (CC BY 4.0), disponibles (en [este enlace](https://datos.tenerife.es/es/datos/conjuntos-de-datos/centros-deportivos-y-de-ocio-en-tenerife?return=aHR0cHM6Ly9kYXRvcy50ZW5lcmlmZS5lcy9lcy9kYXRvcy9jb25qdW50b3MtZGUtZGF0b3M=)) y descargables en formato CSV, por lo que, al igual que en el caso anterior, cumplen con todas las restricciones necesarias definidas anteriormente para la selección de datos.

En la etapa de selección de datos se decidió emplear ambos conjuntos de datos como la fuente de origen de datos para realizar el proceso de generación de datos enlazados con ellos. La principal razón de esta decisión es que utilizan la misma estructura y permitiría la creación de una aplicación (o, al menos, un prototipo funcional de aplicación) que explote los datos de forma óptima, posibilitando búsquedas de diferentes tipos de centros, orientados a diferentes actividades y no sólo de ciertas actividades concretas (como podrían ser las deportivas o las educativas por separado).

Finalmente, en la página web de datos abiertos del Cabildo de Tenerife (en [este enlace](https://datos.tenerife.es/es/datos/conjuntos-de-datos?filter[groups][0]=cultura-ocio)) cabe destacar que se encontraron otros datos que podrían haber sido de interés para el desarrollo del proyecto, sin embargo, el dominio de centros relacionados con actividades socio-culturales era de mayor interés para el autor del proyecto que otros dominios como las actividades culturales en sí mismas, lo que hizo que se tomara la decisión de utilizar los conjuntos anteriores. 
