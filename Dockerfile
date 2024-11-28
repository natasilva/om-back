# Primeira etapa: Build da aplicação
FROM node:18 AS builder

# Diretório de trabalho na etapa de build
WORKDIR /app

# Copia os arquivos necessários para o build
COPY package*.json ./
RUN npm install

COPY . .

# Faz o build do projeto
RUN npm run build

# Segunda etapa: Criação da imagem final
FROM node:18-alpine AS runner

# Diretório de trabalho na imagem final
WORKDIR /app

# Copia o código compilado (dist), node_modules, e também o diretório src
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./

# Porta exposta
EXPOSE 3000

# Comando padrão ao iniciar o container
CMD ["node", "dist/main"]
