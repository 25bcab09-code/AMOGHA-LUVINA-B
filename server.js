require('dotenv').config(); // for local .env (optional)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend (important for Render)
app.use(express.static(path.join(__dirname, 'public')));

// Home route (ONLY ONE)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test route
app.get('/test', (req, res) => {
  res.send("Server is working 🚀");
});


// ✅ MongoDB connection (NO localhost)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));


// Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: String
});

// Model
const Contact = mongoose.model('Contact', ContactSchema);


// API route
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).send("Name and Email are required");
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.send("Message saved successfully ✅");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data ❌");
  }
});


// ✅ Render uses dynamic PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});