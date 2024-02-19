# Memoria del proyecto final

Asignatura: Web Semántica y Datos Enlazados.

Autor: Rosa Cristina Ruiz Rivas.

## Estructura del repositorio

## Proceso de transformación
En la memoria se explica el proceso de realización de la práctica.

- **Selección de la fuente de datos**: Se probó con los datos ofrecidos por Council energy consumption, en data.gov.UK de electricidad y gas, de 2010-2013 y por falta de permisos de licencia. Se optó por los datos de munimadrid de la agenda de eventos culturales desde un fichero csv disponible en:[enlace](https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default)

- **Análisis de datos**
- `ID-EVENTO`: Eliminación de los identificadores nulos con la herramienta Facet de Open Refine.
- `TITULO`: Se comprobó que los eventos tuvieran horarios distintos.
- `PRECIO`: Columna eliminada por no contener prácticamente ningún precio de entrada disponible.
- `GRATUITO`: Binario que indica si el evento es gratuito o no.
- `LARGA-DURACION`: Binario que indica su duración.
- `DIAS-SEMANA`: Disponibilidad del evento.
- `DIAS-EXCLUIDOS`: Depuración por no contener información de interés.
- `FECHA`, `FECHA-FIN`, `HORA`: Fecha del evento.
- `DESCRIPCION`: Depuración por no ser atributo de interés.
- `INSTALACIÓN`: Dato entero
- `CLASE-VIAL-INSTALACION`,`NOMBRE-VIA-INSTALACION` ,`NUM-INSTALACION`: Dirección.
- `BARRIO-INSTALACION`: Barrio del centro de actividades.
- `COORDENADA-X`: Coordenada de 6 caracteres sobre plano de la ciudad.
- `COORDENADA-Y`: Coordenada de 7 caracteres sobre plano de la ciudad.
- `LATITUD`, `LATITUD` : Eliminadas por contenido redundante.
- `TIPO`: tipo de actividad

- **Licencia**
- Autorización de reutilización y cesión no exclusiva de derechos de propiedad intelectual
- Permiten la reutilización de los documentos y datos sometidos a ellas para fines comerciales y no comerciales.
- Origen de los datos: Ayuntamiento de Madrid.
- Fecha de la última actualización de los documentos objeto de la reutilización:"2024-02-09T17:18:49Z".
- Esta licencia podría distribuirse bajo la licencia: CC BY-SA 4.0.

-  **Creación de una ontología**
Como base de la URI: Ruta por defecto. http://127.0.0.1:3333
Dominio propuesto: http://culture.linkedata.es
Ruta para términos ontológicos: http://culture.linkedata.es/lov/ontology/Event#
Ruta para individuos: http://culture.linkedata.es/lov/resource/   


- **Aplicación y explotación**: esta segunda sección contiene el proceso de aplicación y explotación de los datos enlazados generados en el proceso anterior. Así, es esta sección la que describe el prototipo funcional de aplicación que accede y explota los datos enlazados generados con anterioridad.

- **Conclusiones**: tras lo anterior, se ofrece una sección de conclusiones y lecciones aprendidas durante el desarrollo del proyecto final, a modo de resumen sobre todo el proceso realizado en la práctica.

- **Bibliografía**: la sección final contiene recursos bibliográficos empleados para el desarrollo de la práctica en cualquiera de los aspectos anteriores, desde el proceso de transformación hasta la propia explotación de los datos enlazados generados.
