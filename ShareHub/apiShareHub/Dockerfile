# Usa una imagen de Node.js como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible
EXPOSE 4000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["node", "index.js"]
