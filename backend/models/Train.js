const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    train_name: String,
    train_number: { type: String, unique: true },
    source: String,
    destination: String,
    distance: Number,
    departure: String,
    arrival: String,
});

module.exports = mongoose.model('Train', trainSchema);