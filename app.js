const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Verbindungs-URL zur MongoDB-Datenbank
const url = 'mongodb://localhost:27017';

// Datenbankname
const dbName = 'TestDB';

// Erstellen Sie eine neue MongoClient-Instanz
const client = new MongoClient(url);

// Verwenden Sie die connect-Methode, um eine Verbindung zur Datenbank herzustellen
client.connect(function(err) {
  if (err) throw err;

  console.log("Verbunden mit der MongoDB-Datenbank!");

  // Holen Sie sich die Datenbank
  const db = client.db(dbName);

  // Holen Sie sich die Sammlung
  const collection = db.collection('countries');

  // Definieren Sie eine Route, um Daten aus der Sammlung abzurufen
  app.get('/', (req, res) => {
    collection.find({}).toArray((err, docs) => {
      if (err) throw err;

      res.send(docs);
    });
  });
})