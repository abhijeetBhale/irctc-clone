const express = require('express');
const connectDB = require('./config/db');
const trainRoutes = require('./routes/trainRoutes');
const cors = require('cors'); // <-- 1. IMPORT CORS

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- SETUP MIDDLEWARE ---
app.use(cors()); // <-- 2. USE CORS (This allows requests from your frontend)
app.use(express.json());

// --- DEFINE ROUTES ---
app.get('/', (req, res) => {
  res.send('Welcome to the Modern IRCTC Clone API!');
});

app.use('/api/trains', trainRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});