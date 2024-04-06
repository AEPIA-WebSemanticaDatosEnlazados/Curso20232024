# Memoria del proyecto final

**Asignatura:** Web Semántica y Datos Enlazados.

**Autor:** Jose Manuel Gordon Sahuquillo

### Índice
* [1 - Introducción.](#1---introducción)
* [2 - Proceso de transformación](#2---proceso-de-transformación)
  * [2.1 - Selección de la fuente de datos](#21---selección-de-la-fuente-de-datos)
  * [2.2 - Análisis de los datos](#22---análisis-de-los-datos)
  * [2.3 - Estrategia de nombrado](#23---estrategia-de-nombrado)
  * [2.4 - Desarrollo del vocabulario](#24---desarrollo-del-vocabulario)
  * [2.5 - Proceso de transformación](#25---proceso-de-transformación)
  * [2.6 - Enlazado](#26---enlazado)
  * [2.7 - Publicación](#27---publicación)
* [3 - Aplicación y explotación](#3---aplicación-y-explotación)
* [4 - Conclusiones](#4---conclusiones)
* [5 - Bibliografía](#5---bibliografía)

  



## 1 - Introducción.
Este documento presenta la memoria del proyecto final correspondiente a la asignatura de Web Semántica y Datos Enlazados del Máster Universitario en Investigación en Inteligencia Artificial.

La Web Semántica y los Datos Enlazados son conceptos que están estrechamente relacionados, ya que ambos están enfocados en optimizar la organización y presentación de la información en la web con el objetivo de hacerla más accesible y comprensible para las máquinas y las personas.

El propósito de este trabajo es aplicar los diversos conocimientos adquiridos a lo largo del curso con el objetivo de cumplir los objetivos mencionados anteriormente. Para ello, se ha seleccionado el conjunto de datos "Resumen de escolarización 2023" el cual almacena registros de escolarización por sexo, etapa educativa, centro, idioma, regimen, municipio y provincia de los distintos centros educativos que existen en la Comunidad Valenciana. 

Siguiendo las metodologías establecidas en el curso, se llevará a cabo la transformación de estos datos en un conjunto de datos enlazados, lo que nos permitirá aprovechar al máximo su potencial y facilitará su integración, consulta y análisis en diversos contextos y aplicaciones.

## 2 - Proceso de transformación.
Los siguientes apartados tienen como objetivo describir todo el proceso de transformación de los datos. En primer lugar, se empezará tratando el proceso de selección de la fuente de datos, donde se elegirá una fuente que nos permita completar correctamente este proyecto. Una vez elegida la fuente, pasaremos a realizar un análisis de los datos con el objetivo de comprender su estructura y su contenido.

Una vez completadas las dos primeras fases, pasaremos a la estrategia de nombrado, donde se indicará la estrategia que se va a seguir para el desarrollo del proyecto. Posteriormente, pasaremos al desarrollo del vocabulario, donde se definirán los términos y relaciones.

Tras las fases anteriores, donde se establecerán las bases del proyecto, se iniciará el proceso de transformación, donde se procederá a hacer una limpieza de los datos y prepararlos correctamente para que se puedan explotar adecuadamente.

Continuaremos el trabajo hablando de la fase de enlazado, donde se describirá el proceso que se ha llevado a cabo para enlazar los datos.

Por último, hablaremos de la fase de publicación, donde se estudiará la conveniencia de realizar este proceso.

## 2.1 - Selección de la fuente de datos.
Los datos que se han seleccionado para la transformación provienen del portal de datos abiertos de la Generalitat Valenciana. En concreto, se han seleccionado los siguientes datos: https://dadesobertes.gva.es/es/dataset/edu-alu-gen-2023. Estos datos corresponden al resumen de escolarización del año 2023.

Es un dataset interesante, ya que permite visualizar un resumen detallado de la distribución por sexos en cada centro educativo en las diferentes etapas educativas. Además, proporciona otro tipo de información útil, como la ubicación de cada centro educativo, el régimen y tipo jurídico al que están adscritos y el programa lingüístico al que están adscritos.

## 2.2 - Análisis de los datos.
(Análisis de los datos, explicando que tipo de datos se manejan, su formato, tipos de valores, y en general cualquier aspecto relevante para su transformación y explotación. Este análisis debe incluir la licencia de origen de los datos y la justificación de la licencia a usar en los datos transformados.)

En primer lugar empezaremos analizando la licencia que tiene el conjunto de datos de origen. Como podemos ver en la web de datos abiertos, nos encontramos con una licencia tipo "Creative Commons Attribution" o lo que es lo mismo, una licencia CC BY 4.0. Esta licencia permite la modificación, redistribución y reutilización de los datos, incluso con fines comerciales, siempre y cuando se reconozca expresamente la autoría original de los datos que en este caso corresponde a la Conselleria de Educación, Universidades y Empleo de la Generalitat Valenciana.

Dado el carácter del proyecto y teniendo en cuenta que el objetivo final es crear un modelo que pueda ser reutilizable por otras personas considero que la licencia resultante del proyecto tiene que ser también CC BY 4.0, ya que así podemos permitir a otras personas compartir, usar y trabajar sobre el proyecto de forma libre, pero dejando patente la autoría del proyecto.

El siguiente paso es realizar un análisis exploratorio de los datos que componen el dataset. Para ello usaremos la herramienta Open Refine. Vemos que el conjunto de datos de origen tiene un total de 18461 registros que se encuentran distribuidos en 23 campos, los cuales son:

| Campo    | Tipo de dato | Descripción   |
|-----------|------|----------|
| _id | int | Es el campo clave que identifica al registro de la tabla.|
| CURSO_ACAD | int | Hace referencia al curso escolar del registro.|
| COD_CENTRO | int| Es un identificador único que identifica al centro educativo.|
| NOM_CENTRO | String| Es un campo que hace referencia al nombre del centro educativo. |
| REG_JUR | String | Este campo está compuesto por tres letras, que son la abreviatura del régimen jurídico al que está adscrito el centro educativo.|
| COD_TIPO | Char| En este campo tenemos un carácter que especifica el tipo de centro educativo que es.|
| DESC_TIPO_ES | String | Este campo nos indica en castellano el tipo de enseñanza que da el centro educativo.|
| DESC_TIPO_VA | String |Este campo nos indica en valenciano el tipo de enseñanza que da el centro educativo. |
| LOCALIDAD | String | Este campo nos indica en qué localidad se encuentra el centro educativo. |
| COD_MUN | int | Es el número del código de municipio donde se encuentra el centro educativo.|
| NOM_MUN_OF | String | Este campo hace referencia a los nombres oficiales aceptados para el municipio en castellano y valenciano.|
| NOM_PROV_ES | String | Indica el nombre de la provincia en castellano.|
| NOM_PROV_VA | String |  Indica el nombre de la provincia en valenciano.|
| COD_ENSE | int | Hace referencia al código de enseñanza que tiene el centro.|
| DESC_ENSE_ES | String |Es una descripción de la enseñanza en castellano.|
| DESC_ENSE_VA | String |Es una descripción de la enseñanza en valenciano.|
| COD_CURSO | int | Indica el curso que hace referencia el registro.|
| IDIOMA | String | Hace referencia al programa lingüístico que está suscrito.|
| MUJERES | int | Indica el total de mujeres matriculadas en el centro educativo en ese curso en concreto. |
| HOMBRES | int | Indica el total de hombres matriculados en el centro educativo en ese curso en concreto.|
| OTROS | int | Indica el total de personas sin género definido matriculadas en el centro educativo en ese curso en concreto.|
| TOTAL_MATRICULACIONES | int | Indica el total de personas matriculadas en el centro en ese curso en concreto.|













## 2.3 - Estrategia de nombrado.


























## 2.4 - Desarrollo del vocabulario.


























## 2.5 - Proceso de transformación.


























## 2.6 - Enlazado.


























## 2.7 - Publicación.


























## 3 - Aplicación y explotación.


























## 4 - Conclusiones.


























## 5 - Bibliografía.

























