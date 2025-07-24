import React, { useState } from 'react';
import styled from 'styled-components';
import { searchTrains } from '../services/api';
import TrainCard from '../components/TrainCard';
import toast from 'react-hot-toast';

const HomePageWrapper = styled.div`
  background-color: #f8f9fa; /* Soft off-white background */
  min-height: 100vh;
  font-family: 'Inter', sans-serif; /* A modern, clean font */
  padding: 2rem 1rem;

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #212529; /* Very dark gray for text */
  }

  p {
    color: #6c757d; /* Muted gray */
    margin-top: 0.5rem;
    font-size: 1.125rem;
  }

  .search-card {
    background-color: #ffffff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 2rem;
    border: 1px solid #dee2e6;
  }

  .search-form {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .input-field {
    flex-grow: 1;
    width: 100%;
    background-color: #f1f3f5;
    color: #212529;
    border: 1px solid #ced4da;
    border-radius: 0.5rem;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }

  .search-button {
    background-color: #007bff;
    color: white;
    font-weight: 600;
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }
    &:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
      transform: translateY(0);
    }
  }

  .results-container {
    margin-top: 3rem;
  }

  @media (max-width: 768px) {
    .search-form {
      flex-direction: column;
    }
    .search-button {
      width: 100%;
    }
  }
`;

function HomePage() {
  // The component's logic (useState, handleSearch) remains exactly the same.
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [trains, setTrains] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setTrains([]);
    setIsSearching(true);
    const loadingToast = toast.loading('Searching for trains...');
    try {
      const response = await searchTrains(from, to);
      toast.dismiss(loadingToast);
      if (response.data.length === 0) {
        toast.error('No direct trains found for this route.');
      } else {
        setTrains(response.data);
        toast.success(`Found ${response.data.length} trains!`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('An error occurred. Please check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <HomePageWrapper>
      <div className="container">
        <header>
          <h1>Find Your Train 🚂</h1>
          <p>The simplest way to search for Indian Railway trains.</p>
        </header>

        <main>
          <div className="search-card">
            <form onSubmit={handleSearch} className="search-form">
              <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From Station" required className="input-field" />
              <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To Station" required className="input-field" />
              <button type="submit" disabled={isSearching} className="search-button">
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>

          <div className="results-container">
            {trains.map((train) => (
              <TrainCard key={train._id} train={train} />
            ))}
          </div>
        </main>
      </div>
    </HomePageWrapper>
  );
}

export default HomePage;