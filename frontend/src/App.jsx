import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
// import PnrStatusPage from './pages/PnrStatusPage'; // 1. Import the new page

function App() {
  return (
    // 2. Wrap everything in the Router component
    <Router>
      {/* The Toaster and Header are outside Routes so they appear on every page */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#28a745',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#dc3545',
              color: 'white',
            },
          },
        }}
      />
      <Header />
      {/* 3. Use the Routes component to define your pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/pnr-status" element={<PnrStatusPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;