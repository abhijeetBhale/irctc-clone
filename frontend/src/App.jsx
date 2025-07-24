import React from 'react';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast'; // 1. Import Toaster

function App() {
  return (
    <div>
      {/* 2. Add Toaster component here */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            style: {
              background: '#28a745', // Green
            },
          },
          error: {
            style: {
              background: '#dc3545', // Red
            },
          },
        }}
      />
      <HomePage />
    </div>
  );
}

export default App;