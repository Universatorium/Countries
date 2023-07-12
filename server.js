const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

const mongoHost = process.env.MONGODB_HOST || "localhost";
const mongoPort = process.env.MONGODB_PORT || 27017;
const mongoDbName = process.env.MONGODB_DB || "TestDB";

app.get("/", async (req, res) => {
    try {
        const client = await mongodb.MongoClient.connect(
            `mongodb://${mongoHost}:${mongoPort}`
        );
        const db = client.db(mongoDbName);
        const collection = db.collection("countries");
        const data = await collection.find({}).toArray();
        console.log(data);
        res.json(data);
        client.close();
    } catch (error) {
        console.log("Error getting Data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});