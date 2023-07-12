use mydb

// JSON-Datei importieren
var importFilePath = './verzeichnis.json';
var collectionName = 'medaillen';

var importCommand = 'mongoimport --db mydb --collection ' + collectionName + ' --file ' + importFilePath + ' --jsonArray';

try {
  var exec = require('child_process').exec;
  exec(importCommand, function(error, stdout, stderr) {
    if (error) {
      print('Fehler beim Importieren der JSON-Datei: ' + error.message);
    } else {
      print('JSON-Datei erfolgreich importiert.');
    }
  });
} catch (e) {
  print('Fehler beim Ausführen des Importbefehls: ' + e.message);
}
