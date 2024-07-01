const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3000; // Change to your desired port
const mongoUrl = 'mongodb+srv://spranawaka98:sp1234@power.bfkm0fz.mongodb.net/Ac-Power-moniter?retryWrites=true&w=majority&appName=power'; // Change to your MongoDB connection string
const dbName = 'energyMonitoring';
const collectionName = 'measurements';

app.use(bodyParser.json());
app.use(cors());

// Serve the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.post('/upload', async (req, res) => {
  const data = req.body;

    // Add a timestamp field
  data.timestamp = new Date();

  try {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne(data);
    client.close();

    res.status(200).send('Data saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data to MongoDB');
  }
});





app.get('/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
    client.close();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from MongoDB');
  }
});


app.get('/data/all', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find().sort({ _id: 1 }).toArray();
    client.close();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB');
  }
});

// Catch all handler to serve the React app for any route not handled by API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


