const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB
mongoose.connect('mongodb://25bcab09:Al061311@ac-gnbip4d-shard-00-00.3suuhwy.mongodb.net:27017,ac-gnbip4d-shard-00-01.3suuhwy.mongodb.net:27017,ac-gnbip4d-shard-00-02.3suuhwy.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-6wapuc-shard-0&authSource=admin&appName=Cluster-1')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// API
app.post('/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.send("Message saved!");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

// 🔥 IMPORTANT FIX
app.get('/', (req, res) => {
  res.sendFile(require('path').join(__dirname, 'public', 'index.html'));
});
app.get('/test', (req, res) => {
  res.send("Server is working");
});

// Server
app.listen(5000, () => console.log("Server running on port 3000"));