# Dockerfile para despliegue en Railway o cualquier contenedor
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --production

# Copiar código del proyecto
COPY . .

# Exponer puerto por defecto
ENV PORT=3000
EXPOSE 3000

# Iniciar servidor
CMD ["node", "server/index.js"]
