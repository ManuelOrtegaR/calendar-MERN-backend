# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --omit=dev

# Copia el resto del código
COPY . .

# Expone el puerto 4000
EXPOSE 4000

# Comando para ejecutar la app
CMD ["npm", "start"]
