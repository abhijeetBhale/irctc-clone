const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    train_number: String,
    station_name: String,
    station_code: String,
    arrival: String,
    departure: String,
    day: Number,
});

module.exports = mongoose.model('Schedule', scheduleSchema);