# Basisimage
FROM node:latest

# Arbeitsverzeichnis erstellen
WORKDIR /usr/src/app

# MongoDB-Client über offizielles Repository installieren
RUN apt-get update && apt-get install -y gnupg
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 656408E390CFB1F5
RUN apt-get update && apt-get install -y mongodb-org-tools

# Kopiere die JSON-Datei in das Arbeitsverzeichnis
COPY verzeichnis.json .

# Umgebungsvariablen für die Konfiguration festlegen
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=pass123

# Container-Port freigeben
EXPOSE 27017

# Datenbank-Initialisierung über den mongoimport-Befehl
CMD mongoimport --host localhost:27017 --db mydb --collection countries --file verzeichnis.json --jsonArray
