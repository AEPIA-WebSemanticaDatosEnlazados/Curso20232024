# Memoria del Proyecto final

- _Asignatura_: Web Semántica y Datos enlazados
- _Autor_: Ángel Iglesias Préstamo

---

## Tabla de contenidos

---

## Introducción

En el presente documento se recoge la memoria del proyecto final de la
asignatura del _Máster Universitario de Investigación en Inteligencia_
_Artificial de la AEPIA_ de _Web Semántica y Datos enlazados_. Este proyecto
consiste en la selección y transformación de un conjunto de datos de futbolistas
obtenido de la base de datos de referencia [Transfermarkt](transfermarkt.com/).
Este proceso se ha realizado siguiendo la metodología estudiada en la asignatura.

El objetivo de este trabajo es preparar los datos en un formato de texto plano,
`csv`, para facilitar la accesibilidad, interoperabilidad y consulta de estos
tanto por personas como por máquinas. La base de datos que tomamos como referencia
contiene más de 1 millón de entradas, aunque el dataset ronda las 30.000,
aún así, el volumen de datos es tal que dificulta el manejo de estos por
usuarios no-técnicos. De esta manera, la idea es, siguiendo los 4 principios
de los datos enlazados, ofrecer una solución que permita conseguir un mejor
descubrimiento, automatización e interoperabilidad de los datos.

## Proceso de transformación

### Selección de la fuente de datos

En el contexto del fútbol, la base de datos de referencia para obtener
información en lo referente a jugadores, equipos o agentes, es
[Transfermarkt](transfermarkt.com/). Además, llevo años usándola asiduamente
para realizar consultas de diversa índole. Esta página es usada no sólo por
aficionados, sino que también por equipos, ligas, asociaciones, y un amplio
rango de _stakeholders_. Este portal está dedicado a proveer informaciones de
mercado, intercambios, ventas, rumores y estadísticas del mundo del fútbol; no
sólo actuales, sino históricas. Esta información se ofrece en abierto, sin
ningún tipo de comisión.

Estos datos se ofrecen a través de un servicio web, y se actualizan con una
frecuencia semanal. Donde se van incorporando goles, asistencias, valor de
mercado, títulos, y otros atributos que son relevantes sobre jugadores, equipos
y otras entidades. Estas estadísticas se limitan únicamente a datos referentes
al rendimiento deportivo, y se ciñen a información pública, respetando el
RGPD.

Los datos se enceuntran en formato `.csv`, y no existe ninguna base de datos
RDF de [Transfermarkt](transfermarkt.com/).

### Análisis de los datos

El conjunto de datos original presenta la siguiente estructura:

- `player_id`: identificador único del jugador en 
  [Transfermarkt](transfermarkt.com/). Puede tomar valores numéricos mayores que
  cero.
- `first_name`: nombre del jugador. Es una cadena de caracteres y con una alta
  cardinalidad.
- `last_name`: primer apellido del jugador. Es una cadena de caracter con alta
   cardinalidad.
- `name`: nombre completo; esto es, nombre y primer apellido. Se produce mediante
  la combinación de las dos variables anteriores.
- `last_season`: última temporada en activo. Es una variable nuérica que comienza
  en 2012 y termina en la campaña inmediatamente anterior a la presente.
  Encontramos que este campo contiene datos erróneos.
- `current_club_id`: identificador único del equipo en el que milita el jugador.
  Puede tomar valores numéricos mayores que cero.
- `player_code`: código de jugador usando en la URL de
  [Transfermarkt](transfermarkt.com/). Se produce mediante la combinación del
  nombre y apellido, en minúsculas, separado por guión.
- `country_of_birth`: país de nacimiento. Toma como valor el nombre, en inglés,
  del país. Es por tanto, una cadena de caracteres.
- `city_of_birth`: ciudad de nacimiento. Toma como valor el nombre, en inglés,
  de la ciudad. Es por tanto, una cadena de caracteres.
- `country_of_citizenship`: selección para la que juega. No se tiene por qué
  corresponder con el país de nacimiento. Es una cadena de caracteres.
- `date_of_birth`: fecha de nacimiento. Formato de fecha: `YYYY-MM-DD`. Toma
  valores desde el año 1968 hasta el 2008.
- `sub_position`: posición dentro de la línea que ocupa. Variable discreta con
  cierta cardinalidad que representa la posición exacta que ocupa el jugador;
  i.e.: *Left Winger*, *Centre Back*...
- `position`: línea en el campo en la que juega: _Portería_, _Defensa_,
  _Centro del campo_ o _Delantero_. Variable discreta que puede tomar 4 valores.
- `foot`: pierna dominante. Variable binaria: *Left* o *Right*. Siendo la clase
  mayoritaria la segunda. También presenta un alto porcentaje de datos
  faltantes: 12%.
- `height_in_cm`: altura en centímetros.
- `contract_expiration_date`: fecha de expiración del último contrato con un
  club. Formato de fecha: `YYYY-MM-DD`. Toma valores desde el año 2023 hasta
  el 2032.
- `agent_name`: nombre del agente. Es una cadena de caracteres con alta
  cardinalidad.
- `image_url`: enlace a la imagen identificativa del jugador. Toma formato de URL.
- `url`: enlace a la página en [Transfermarkt](transfermarkt.com/) del perfil
  del jugador. Toma formato de URL.
- `current_club_domestic_competition_id`: identificador de la liga en la que
  juega el último equipo al que ha pertenecido el jugador. Variable discreta,
  que tiene la forma de prefijo de dos caracteres correspondiente con el país, y
  un número que se corresponde con la división; i.e.: la Primera División de
  España se corresponde con `ES1`.
- `current_club_name`: nombre del último club al que ha pertenecido el jugador.
  Es una cadena de caracteres con una alta cardinalidad.
- `market_value_in_eur`: valor en euros del jugador. Es un número entre 10.000 y
  180 millones.
- `highest_market_value_in_eur`: máximo valor alcanzado por el jugador en euros.
  Es un número entre 10.000 y 200 millones.

### Estrategia de nombrado de recursos

Para definir la estrategia de nombrado de recursos vamos a seguir las
recomendaciones que se han visto en la parte teórica de la asignatura. Es por
eso que vamos a utilizar la almohadilla (`#`) para los términos ontológicos,
y la barra (`/`) para los individuos del conjunto de datos. Esta decisión no
sólo se basa en la recomendación teórica, sino que también sabemos que los
términos del vocabulario son un número bajo, y no se esperan cambios en ellos;
esto es, existe una visión compartida sobre cómo se modelan los datos de
futbolistas, y no se espera que esta visión cambie. Sin embargo, para las
instancias concretas sí que esperamos actualizaciones frecuentes; semanalmente,
esto es, son dinámicas. Además, el volumen de datos ronda las decenas de miles
de instancias. Al acceder a un recurso usando la almohadilla se elimina el
identificador del fragmento y se devuelve todo el documento, en el que se
encuentra el recurso que nos interesa. Como en nuestro caso el volumen de datos
es elevado, y por lo tanto el documento completo es muy pesado, estaríamos
realizando una petición muy costosa. Sin embargo, mediante el uso de la barra
realizamos accesos individuales. De esta manera, para individuos es más
eficiente este segundo método.

Cabe destacar -- también -- que se parte de la suposición de que tenemos
propiedad sobre el dominio utilizado. Para este caso de uso vamos a hacer uso
del dominio [http://rdf.transfermarkt.com/]().

Una vez hemos definido el dominio, continuaremos con la definición de las rutas
para los distintos elementos que componen nuestra arquitectura:

- **Ruta para términos ontológicos**:
  [http://rdf.transfermarkt.com/ontology/player#]()
- **Ruta para individuos**:
  [http://rdf.transfermarkt.com/resource/]()

Finalmente, definimos los patrones de URI:

- **Patrón de URI para términos ontológicos**:
  [http://rdf.transfermarkt.com/ontology/player#\<term>](). Donde `<term>` hace
  referencia a un término ontológico en concreto.
- **Patrón de URI para individuos**:
  [http://rdf.transfermarkt.com/resource/\<type>/\<id>](). Donde `<type>` hace
  referencia al tipo del recurso, y el `<id>` es el  identificador único de
  éste.

### Desarrollo de la ontología

#### Especificación de requisitos

##### Requisitos Funcionales

La ontología debe satisfacer toda una serie de cuestiones -- conocidas como
preguntas de competencia -- donde se garantiza que se modela correctamente el
caso de uso que nos compete.

| ID    | Descripción                                                                |
| ----- | -------------------------------------------------------------------------- |
| PC.1  | ¿Qué información personal tiene el jugador (altura, nombre, apellidos...)? |
| PC.2  | ¿Se encuentra en activo o retirado?                                        |
| PC.3  | ¿En qué equipo juega?                                                      |
| PC.4  | ¿En qué división juega?                                                    |
| PC.5  | ¿Dónde ha nacido (ciudad y país)?                                          |
| PC.6  | ¿Cuál es su nacionalidad?                                                  |
| PC.7  | ¿En qué posición juega?                                                    |
| PC.8  | ¿Tiene contrato en vigor?                                                  |
| PC.9  | ¿Quién es su agente?                                                       |
| PC.10 | ¿Cuál es el valor del jugador en el mercado actual?                        |
| PC.11 | ¿Cuál es el valor máximo que ha alcanzado el jugador?                      |

##### Requisitos No Funcionales

Además, a parte de especificar requisitos relativos al modelo, también queremos
asegurar toda una serie de criterios de calidad de nuestra ontología. Estos se
definen a través de los requisitos no funcionales.

| ID    | Título                                      | Descripción |
| ----- | ------------------------------------------- | ----------- |
| RNF.1 | Reutilización de vocabularios ya existentes | Se considera una buena recomendación en el mundo de los datos enlazados el uso de vocabularios ya existentes, bien soportados por comunidades o estandarizados. La idea es, en caso de que la mayor parte de los conjuntos de datos utilicen un determinado vocabulario, usar ese en lugar de crear uno |
| RNF.2 | Vocabulario implementado en Turtle          | Implementaremos nuestro vocabulario en Turtle ya que es un formato de dato aceptado por OpenRefine, y además, es con el que estoy más familiarizado y su sintaxis me resulta más agradable |
| RNF.3 | Escalable verticalmente con facilidad       | La idea es que podamos incluir nuevas definiciones sin necesidad de modificar las ya existentes. De esta manera, introducir nuevas líneas de código sólo implicará escribir nuevas definiciones |

#### Extracción de términos

Ahora bien, a partir de la especificación de requisitos definida en el apartado
anterior obtendremos una serie de términos que son necesarios para dar soporte
a las preguntas formuladas. Las clases son las siguientes:

| Clase    | Descripción |
| -------- | ----------- |
| Jugador  | Persona que ofrece sus servicios como futbolista a un equipo profesional |
| Ciudad   | Lugar urbano |
| Equipo   | Club para el que juega el jugador. Es la organización a la que se le asocia |
| División | Organización a la que está asociada el equipo en el que juega el futbolista y en la que compite |
| Agente   | Empresa que negocia los contratos en nombre del jugador  |
| Coste    | Descripción del valor que se debe pagar por el jugador |
| Contrato | Acuerdo entre el jugador y el equipo en el que ofrece sus servicios |
| País     | Estado de nacimiento o nacionalidad |

Y las propiedades:

| Propiedad                      | Descripción |
| ------------------------------ | ----------- |
| Identificador             | Identificador único del recurso |
| Nombre                    | Cadena de caracteres que identifica el recurso |
| Apellido                  | Apellido o apellidos del jugador |
| Altura                    | Estatura en centímetros del jugador |
| Acuerdo                   | Acuerdo al que han llegado un jugador y un equipo |
| Empleador                 | Afiliación del jugador con un equipo |
| Fecha de finalización     | Fecha en la que termina el último acuerdo establecido entre un equipo y el jugador |
| Lugar de Nacimiento       | Lugar urbano en el que ha nacido el jugador |
| Fecha de nacimiento       | Fecha en la que nació el jugador |
| Nacionalidad              | País para el que el jugador opta a jugar a nivel de selecciones. No es necesaramiente su país de nacimiento |
| Posición                  | Lugar en el campo que ocupa el jugador en los partidos |
| Pierna buena              | Pierna dominante del jugador  |
| Contacto                  | Persona u organización a la que se debe contactar por motivos profesionales |
| Valor neto                | Valor de un jugador |
| Valor actual              | Cifra monteria que debe pagar un club que está ineteresado en hacerse con los servicios del jugador |
| Valor máximo              | Valor máximo que ha alcanzado el jugador en el histórico |
| Unidad Monetaria          | Moneda usada para describir los valores económicos |
| Pertenece a               | Relación entre dos recursos donde el sujeto es parte del objeto |
| Imagen                    | Enlace a la imagen del jugador en [Transfermarkt](transfermarkt.com/) |
| URL                       | Enlace al perfil del jugador en [Transfermarkt](transfermarkt.com/) |

#### Elaboración de la conceptualización

![Mapa conceptual de la ontología que estamos desarrollando](./img/WebSemantica-conceptual.svg)

#### Búsqueda y selección de ontologías

De acuerdo con lo descrito en los requisitos no funcionales, hemos visto que
se pretende reutilizar vocabularios ya existentes. La idea es utilizar aquellos
que sean estándares, o bien estén apoyados por grandes comunidades. De esta
manera, y como nuestros datos pertenecen a dos categorías: de interés deportivo,
y de interés general, centraremos nuestros esfuerzos en encontrar ontologías
que satisfagan ambos propósitos.

| Término  | Ontología                                  | Clase |
| -------- | ------------------------------------------ | ----- |
| Jugador  |                                            |       |
| Ciudad   | [https://schema.org/](https://schema.org/) | [City](https://schema.org/City) |
| Equipo   | [https://schema.org/](https://schema.org/) | [Organization](https://schema.org/SportsTeam) |
| División | [https://schema.org/](https://schema.org/) | [Organization](https://schema.org/SportsOrganization) |
| Agente   | [https://schema.org/](https://schema.org/) | [EmploymentAgency](https://schema.org/EmploymentAgency) |
| Coste    | [https://schema.org/](https://schema.org/) | [MonetaryAmount](https://schema.org/MonetaryAmount) |
| Contrato | [https://schema.org/](https://schema.org/) | [Role](https://schema.org/Role) |
| País     | [https://schema.org/](https://schema.org/) | [Country](https://schema.org/Country) |

Para términos de interés general he decidido seleccionar 
[schema.org](https://schema.org/), ya que está soportado por una gran
comunidad, incluyendo el esfuerzo por parte de Google, Bing, Yahoo! y Yandex.
Si bien se podrían utilizar otras alternativas como
[Microformats](https://microformats.org/) o [FOAF](http://xmlns.com/foaf/spec/),
la idea es que [schema.org](https://schema.org/) da soporte a un mayor
espectro de términos. Así, es razonable pensar que sólo requiramos reutilizar
éste vocabulario, y así podamos mantener una consistencia estilística a la hora
de implementar nuestra ontología.

| Término                   | Dominio  | Rango             | Ontología                                  | Propiedad |
| ------------------------- | -------- | ----------------- | ------------------------------------------ | --------- |
| Identificador             | Jugador  | `xsd:integer`     | [https://schema.org/](https://schema.org/) | [identifier](https://schema.org/identifier) |
|                           | Equipo   | `xsd:integer`     | [https://schema.org/](https://schema.org/) | [identifier](https://schema.org/identifier) |
|                           | División | `xsd:string`      | [https://schema.org/](https://schema.org/) | [identifier](https://schema.org/identifier) |
| Nombre                    | Jugador  | `xsd:string`      | [https://schema.org/](https://schema.org/) | [givenName](https://schema.org/givenName) |
|                           | Ciudad   | `xsd:string`      | [https://schema.org/](https://schema.org/) | [name](https://schema.org/name) |
|                           | País     | `xsd:string`      | [https://schema.org/](https://schema.org/) | [name](https://schema.org/name) |
|                           | Equipo   | `xsd:string`      | [https://schema.org/](https://schema.org/) | [name](https://schema.org/name) |
|                           | Agente   | `xsd:string`      | [https://schema.org/](https://schema.org/) | [name](https://schema.org/name) |
| Apellido                  | Jugador  | `xsd:string`      | [https://schema.org/](https://schema.org/) | [familyName](https://schema.org/familyName) |
| Altura                    | Jugador  | `xsd:integer`     | [https://schema.org/](https://schema.org/) | [height](https://schema.org/height) |
| Acuerdo                   | Jugador  | Contrato          | [https://schema.org/](https://schema.org/) | [hasOccupation](https://schema.org/hasOccupation) |
| Empleador                 | Equipo   | Jugador           | [https://schema.org/](https://schema.org/) | [hiringOrganization](https://schema.org/athlete) |
| Fecha de finalización     | Contrato | `xsd:dateTime`    | [https://schema.org/](https://schema.org/) | [endDate](https://schema.org/endDate) |
| Lugar de Nacimiento       | Jugador  | Ciudad            | [https://schema.org/](https://schema.org/) | [birthPlace](https://schema.org/birthPlace) |
| Fecha de nacimiento       | Jugador  | `xsd:dateTime`    | [https://schema.org/](https://schema.org/) | [birthDate](https://schema.org/birthDate) |
| Nacionalidad              | Jugador  | País              | [https://schema.org/](https://schema.org/) | [nationality](https://schema.org/nationality) |
| Posición                  | Jugador  | `xsd:string`      |                                            |  |
| Pierna buena              | Jugador  | `xsd:string`      |                                            |  |
| Contacto                  | Jugador  | Agente            | [https://schema.org/](https://schema.org/) | [contactPoint](https://schema.org/contactPoint) |
| Valor neto                | Jugador  | Coste             | [https://schema.org/](https://schema.org/) | [netWorth](https://schema.org/netWorth) |
| Valor actual              | Coste    | `xsd:integer`     | [https://schema.org/](https://schema.org/) | [value](https://schema.org/value) |
| Valor máximo              | Coste    | `xsd:integer`     | [https://schema.org/](https://schema.org/) | [maxValue](https://schema.org/maxValue) |
| Unidad Monetaria          | Coste    | `xsd:string`      | [https://schema.org/](https://schema.org/) | [currency](https://schema.org/currency) |
| Pertenece a               | Ciudad   | País              | [https://schema.org/](https://schema.org/) | [containedInPlace](https://schema.org/containedInPlace) |
|                           | Equipo   | División          | [https://schema.org/](https://schema.org/) | [memberOf](https://schema.org/memberOf) |
| Imagen                    | Jugador  | `xsd:anyURI`      | [https://schema.org/](https://schema.org/) | [image](https://schema.org/image) |
| URL                       | Jugador  | `xsd:anyURI`      | [https://schema.org/](https://schema.org/) | [url](https://schema.org/url) |

#### Implementación de la ontología



#### Evaluación de la ontología



### Proceso de transformación



### Enlazado con otras fuentes de datos



### Publicación de los datos



## Aplicación y explotación



## Conclusiones




## Referencias