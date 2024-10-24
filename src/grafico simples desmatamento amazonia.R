install.packages("readxl")
install.packages("ggplot2")


library(readxl)
library(ggplot2)
library(scales)


file_path <- "base_amazonia_desmatada.xlsx"

base_amazonia_desmatada <- read_excel(file_path)

base_amazonia_desmatada$cumulative_area <- cumsum(base_amazonia_desmatada$`area km²`)


ggplot(base_amazonia_desmatada, aes(x = year, y = cumulative_area)) +
  geom_line(color = "darkgreen", size = 1.2) +
  geom_point(color = "darkgreen", size = 2) +
  labs(title = "Aumento Acumulado do Desmatamento na Amazônia (2008-2023)",
       x = "Ano",
       y = "Área Desmatada Acumulada (km²)") +
  scale_y_continuous(breaks = seq(0, max(base_amazonia_desmatada$cumulative_area), by = 20000), 
                     labels = comma_format()) + 
  theme_minimal()

