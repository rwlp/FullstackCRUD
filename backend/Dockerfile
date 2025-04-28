# Fase 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

#Usamos uma imagem mais leve para ambiente de producao
FROM node:20-alpine

# Isso garante espera do banco de dados pronto antes de continuar
RUN apk update && apk add postgresql-client

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
