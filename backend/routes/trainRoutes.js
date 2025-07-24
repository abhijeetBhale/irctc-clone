const express = require('express');
const { searchTrains, getTrainSchedule } = require('../controllers/trainController');

const router = express.Router();

// This will map the GET request for '/api/trains/search' to the searchTrains controller
router.get('/search', searchTrains);

// Route for getting a specific train's schedule
// The ':trainNumber' makes it a dynamic parameter
router.get('/:trainNumber/schedule', getTrainSchedule);

module.exports = router;