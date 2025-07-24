import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Function to search for trains
export const searchTrains = (from, to) => {
  return api.get(`/trains/search?from=${from}&to=${to}`);
};

// --- ADD THIS FUNCTION ---
// Function to get the schedule for a specific train
export const getSchedule = (trainNumber) => {
  return api.get(`/trains/${trainNumber}/schedule`);
};