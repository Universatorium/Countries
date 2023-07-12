const express = require("express");
const path = require("path");
const mongodb = require("mongodb");

const app = express();
const port = 3000;

const mongoHost = process.env.MONGODB_HOST || "localhost";
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoDbName = process.env.MONGODB_DB || "TestDB";

app.use(express.static(path.join(__dirname, "backend")));

app.get("/", async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(
      `mongodb://${mongoHost}:${mongoPort}`
    );
    const db = client.db(mongoDbName);
    const collection = db.collection("countries");
    const data = await collection.find({}).toArray();
    client.close();

    // Rendere die index.html-Datei mit den Daten
    res.send(renderIndexHtml(data));
  } catch (error) {
    console.log("Error getting Data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Hilfsfunktion zum Rendern der index.html-Datei mit den Daten
function renderIndexHtml(data) {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Medaillen-Spiegel</title>
      </head>
      <body>
        <h1>Medaillen-Spiegel:</h1>
        <table>
          <tr>
            <th style='h3'>Land  </th>
            <th style='h3'>Gold</th>
            <th>Silber</th>
            <th>Bronze  </th>
            <th>Gesamt</th>
          </tr>`;

  data.forEach((item) => {
    html += `
          <tr>
            <td style='h3'>${item.name}</td>
            <td>   ${item.gold}</td>
            <td>   ${item.silber}</td>
            <td>   ${item.bronze}</td>
            <td>   ${item.gesamt}</td>
          </tr>`;
  });

  html += `
        </table>
      </body>
    </html>`;

  return html;
}
