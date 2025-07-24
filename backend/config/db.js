const mongoose = require('mongoose');

// It's a best practice to use environment variables for sensitive data
const MONGO_URI = 'mongodb://localhost:27017/irctc-clone';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully! 🎉');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;