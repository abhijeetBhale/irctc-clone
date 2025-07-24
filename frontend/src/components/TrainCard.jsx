import React, { useState } from 'react';
import styled from 'styled-components';
import { getSchedule } from '../services/api';
import ScheduleModal from './ScheduleModal';
import toast from 'react-hot-toast';

// The TrainCardWrapper styled-component remains the same as before

const ViewRouteButton = styled.button`
    background-color: transparent;
    color: #007bff;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #007bff;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
    width: 100%;

    &:hover {
      background-color: #007bff;
      color: white;
    }
`;

// (Paste the existing TrainCardWrapper styled-component code here)
const TrainCardWrapper = styled.div`
  background-color: white;
  border: 1px solid #e9ecef; /* Light gray border */
  border-radius: 0.75rem; /* Slightly larger radius */
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .title {
    color: #212529; /* Dark text for high contrast */
    font-weight: 700;
    font-size: 1.125rem;
  }

  .number {
    color: #6c757d; /* Muted gray for secondary text */
    font-size: 0.875rem;
  }

  .distance {
    background-color: #e7f5ff; /* Light blue background */
    color: #1971c2; /* Darker blue text */
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    text-align: center;
  }

  .station-box {
    padding: 0.5rem;
  }

  .station-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #adb5bd;
    letter-spacing: 0.05em;
  }

  .station-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #343a40;
  }

  .time-departure {
    color: #2f9e44; /* Green */
    font-family: monospace;
    font-size: 1rem;
  }
  .time-arrival {
    color: #e03131; /* Red */
    font-family: monospace;
    font-size: 1rem;
  }
`;


function TrainCard({ train }) {
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewRoute = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Fetching route...');
    try {
      const response = await getSchedule(train.train_number);
      setSchedule(response.data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error('Could not fetch schedule.');
      console.error(error);
      toast.dismiss(toastId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TrainCardWrapper>
        {/* ... The existing card content ... */}
        <div className="header">
          <div>
            <h2 className="title">{train.train_name}</h2>
            <p className="number">#{train.train_number}</p>
          </div>
          <div className="distance">{train.distance} km</div>
        </div>
        <div className="details-grid">
           <div className="station-box">
            <p className="station-label">From</p>
            <p className="station-name">{train.source}</p>
            <p className="time-departure">{train.departure}</p>
          </div>
          <div className="station-box">
            <p className="station-label">To</p>
            <p className="station-name">{train.destination}</p>
            <p className="time-arrival">{train.arrival}</p>
          </div>
        </div>

        <ViewRouteButton onClick={handleViewRoute} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'View Full Route'}
        </ViewRouteButton>
      </TrainCardWrapper>

      {schedule && (
        <ScheduleModal
          schedule={schedule}
          trainName={train.train_name}
          onClose={() => setSchedule(null)}
        />
      )}
    </>
  );
}

export default TrainCard;