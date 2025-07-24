const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Train = require('./models/Train');
const Schedule = require('./models/Schedule');

const MONGO_URI = 'mongodb://localhost:27017/irctc-clone'; 

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing data
    await Train.deleteMany({});
    await Schedule.deleteMany({});
    console.log('Cleared existing data.');

    // Seed Trains
    const trains = [];
    fs.createReadStream('trains.csv')
      .pipe(csv())
      .on('data', (row) => {
        trains.push({
            train_name: row.train_name,
            train_number: row.train_number,
            source: row.source,
            destination: row.destination,
            // --- FIX IS HERE ---
            // If distance is invalid, default to 0
            distance: parseInt(row.distance, 10) || 0,
            departure: row.departure,
            arrival: row.arrival,
        });
      })
      .on('end', async () => {
        await Train.insertMany(trains);
        console.log('✅ Trains seeded successfully!');
        
        // Seed Schedules
        const schedules = [];
        fs.createReadStream('Trains schedule.csv')
          .pipe(csv())
          .on('data', (row) => {
            schedules.push({
                train_number: row.train_number,
                station_name: row.station_name,
                station_code: row.station_code,
                arrival: row.arrival,
                departure: row.departure,
                 // --- FIX IS HERE ---
                // If day is invalid, default to 0
                day: parseInt(row.day, 10) || 0,
            });
          })
          .on('end', async () => {
            await Schedule.insertMany(schedules);
            console.log('✅ Schedules seeded successfully!');
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
          });
      });

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();