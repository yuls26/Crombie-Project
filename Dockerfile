# Usa la imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar el caché
COPY package.json package-lock.json ./

# Instala las dependencias de forma limpia
RUN npm i

# Copia el resto de los archivos al contenedor
COPY . .

# Configura la aplicación para enlazarse a 0.0.0.0 en lugar de localhost
ENV HOST 0.0.0.0
ENV PORT 3000

# Expone el puerto 3000 para Next.js
EXPOSE 3000

# Comando predeterminado para desarrollo (cambiar a "start" para producción)
CMD ["npm", "run", "dev"]
