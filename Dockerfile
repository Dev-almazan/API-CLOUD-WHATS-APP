# Usar la imagen base oficial de Node.js
FROM node:18

# Crear directorio de trabajo para la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar los archivos de la aplicación al contenedor
COPY . .

# Instalar Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean
RUN npm install -g nodemon 

# Exponer los puertos de la aplicación (3000 para Node.js y 8080 para Nginx)
EXPOSE 3000 8080

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Iniciar Nginx y la aplicación Node.js cuando el contenedor esté en funcionamiento
CMD ["./start.sh"]
