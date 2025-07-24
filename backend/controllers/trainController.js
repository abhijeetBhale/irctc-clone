const Train = require('../models/Train');
const Schedule = require('../models/Schedule');

// @desc    Search for trains between two stations
// @route   GET /api/trains/search
// @access  Public
const searchTrains = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: 'Please provide both "from" and "to" station queries.' });
    }

    // Perform a case-insensitive search for trains
    // The 'i' option in the regex makes it case-insensitive
    const trains = await Train.find({
      source: new RegExp(from, 'i'),
      destination: new RegExp(to, 'i'),
    });

    if (trains.length === 0) {
        return res.status(404).json({ message: 'No trains found for the specified route.' });
    }

    res.status(200).json(trains);
  } catch (error) {
    console.error(`Error searching for trains: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get the full schedule for a specific train
// @route   GET /api/trains/:trainNumber/schedule
// @access  Public
const getTrainSchedule = async (req, res) => { // <-- 2. ADD NEW FUNCTION
  try {
    const { trainNumber } = req.params;

    const schedule = await Schedule.find({ train_number: trainNumber }).sort({ day: 1, departure: 1 });

    if (!schedule || schedule.length === 0) {
      return res.status(404).json({ message: 'Schedule not found for this train number.' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error(`Error fetching train schedule: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchTrains,
  getTrainSchedule,
};