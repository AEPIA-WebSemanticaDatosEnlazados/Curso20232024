install.packages("pacman")

pacman::p_load(
  ggplot2
)

theme_set(theme_bw())

datos <- read.csv("players.csv") # Leemos el archivo players.csv
datos[datos==''] <- NA # reemplazamos los faltantes por NAs

datos$first_name <- as.factor(datos$first_name)
datos$last_name <- as.factor(datos$last_name)
datos$name <- as.factor(datos$name)
datos$country_of_birth <- as.factor(datos$country_of_birth)
datos$city_of_birth <- as.factor(datos$city_of_birth)
datos$country_of_citizenship <- as.factor(datos$country_of_citizenship)
datos$sub_position <- as.factor(datos$sub_position)
datos$position <- as.factor(datos$position)
datos$foot <- as.factor(datos$foot)
datos$agent_name <- as.factor(datos$agent_name)
datos$current_club_domestic_competition_id <- as.factor(datos$current_club_domestic_competition_id)
datos$current_club_name <- as.factor(datos$current_club_name)

datos$date_of_birth <- as.Date(datos$date_of_birth)
datos$contract_expiration_date <- as.Date(datos$contract_expiration_date)
 
# Mostramos un resumen de los datos, lo que nos permitirá tener una idea
# de los datos con los que estamos trabajando
summary(datos)

# Además, también quiero mostrar los datos faltantes, para tener una idea
# de cuántos datos de este tipo están presentes en el conjunto de datos
ggplot() +
  geom_bar(
    aes(x = colnames(datos), y = colSums(is.na(datos))),
    stat = 'identity',
    position = 'dodge'
  ) +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1)) +
  xlab("Column") +
  ylab("# of NAs")

# Ahora quiero mostrar los datos anómalos para algunas de las variables que
# hemos identificado en el sumario de los datos
ggplot(datos, aes(y = height_in_cm)) +
  geom_boxplot() +
  theme(
    axis.text.x=element_blank(),
    axis.ticks.x=element_blank()
  ) +
  ylab("Height (in cm.)")