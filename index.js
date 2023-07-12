const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://my_mongodb:27017/TestDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const app = express();

const countrySchema = new mongoose.Schema({
  name: String,
  gold: Number,
  silver: Number,
  bronze: Number,
  gesamt: Number
});

const Country = mongoose.model('Country', countrySchema);

app.get('/', (req, res) => {
  res.send('alles klar soweit?');
});

app.get('/countries', (req, res) => {
  Country.find({}, (err, countries) => {
    if (err) {
      console.error('Error querying countries:', err);
      res.status(500).send('Error querying countries');
    } else {
      res.json(countries);
    }
  });
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});