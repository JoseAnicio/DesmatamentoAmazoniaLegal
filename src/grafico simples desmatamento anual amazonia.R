# Carregar pacotes necessários
library(readxl)
library(ggplot2)
library(scales)

# Caminho para o arquivo
file_path <- "base_amazonia_desmatada.xlsx"

# Ler os dados do arquivo Excel
base_amazonia_desmatada <- read_excel(file_path)

# Renomear a coluna para total_area
base_amazonia_desmatada$total_area <- base_amazonia_desmatada$`area km²`

# Criar o gráfico
ggplot(base_amazonia_desmatada, aes(x = year, y = total_area)) +
  geom_line(color = "darkgreen", size = 1.2) +
  geom_point(color = "darkgreen", size = 2) +
  labs(title = "Desmatamento na Amazônia (2008-2023)",
       x = "Ano",
       y = "Área Desmatada (km²)") +  # Ajustado para refletir a mudança
  scale_x_continuous(breaks = seq(min(base_amazonia_desmatada$year), max(base_amazonia_desmatada$year), by = 1)) + 
  scale_y_continuous(breaks = seq(0, max(base_amazonia_desmatada$total_area), by = 1000), 
                     labels = comma_format()) + 
  theme_minimal()
