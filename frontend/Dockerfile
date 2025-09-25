# Fichier: kairn/frontend/Dockerfile (Version de DÉVELOPPEMENT)

FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package.json ./
COPY package-lock.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Expose le port 3000
EXPOSE 3000

# La commande par défaut pour lancer le serveur de développement
CMD ["npm", "run", "dev"]