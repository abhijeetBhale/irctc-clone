import React from 'react';
import styled, { keyframes } from 'styled-components';

// --- HELPER FUNCTIONS (No changes here) ---
const calculateHaltDuration = (arrivalStr, departureStr) => {
    if (!arrivalStr || !departureStr || arrivalStr.includes('--') || departureStr.includes('--')) {
        return 0;
    }
    try {
        const arrival = new Date(`1970-01-01T${arrivalStr}Z`);
        const departure = new Date(`1970-01-01T${departureStr}Z`);
        const diff = departure.getTime() - arrival.getTime();
        if (diff < 0) return 0;
        return Math.round(diff / (1000 * 60));
    } catch (e) {
        return 0;
    }
};

const formatTime = (timeString) => {
  if (!timeString || timeString.trim() === 'Source' || timeString.trim() === 'Destination') {
    return <span style={{ color: '#adb5bd' }}>--:--</span>;
  }
  const [hours, minutes] = timeString.split(':');
  const hoursInt = parseInt(hours, 10);
  const suffix = hoursInt >= 12 ? 'PM' : 'AM';
  const friendlyHours = ((hoursInt + 11) % 12 + 1);
  return `${String(friendlyHours).padStart(2, '0')}:${minutes} ${suffix}`;
};


// --- STYLED-COMPONENTS (with responsiveness) ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex;
  justify-content: center; align-items: center; z-index: 1000; padding: 1rem;
`;
const ModalContent = styled.div`
  background-color: #f8f9fa; border-radius: 0.75rem; width: 100%;
  max-width: 600px; height: 90%; max-height: 80vh;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); display: flex;
  flex-direction: column; animation: ${fadeIn} 0.3s ease-out;
  margin-right: 30px;
`;
const ModalHeader = styled.header`
  padding: 1rem 1.5rem; border-bottom: 1px solid #dee2e6; display: flex;
  justify-content: space-between; align-items: center; background-color: white;
  border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; flex-shrink: 0;
  h2 { font-size: 1.25rem; font-weight: 700; color: #212529; }
`;
const CloseButton = styled.button`
    background: #e9ecef; border: none; border-radius: 50%; width: 32px;
    height: 32px; display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; line-height: 1; cursor: pointer; color: #495057;
    transition: all 0.2s;
    &:hover { background: #dee2e6; transform: rotate(90deg); }
`;
const RouteList = styled.div`
    padding: 1.5rem; overflow-y: auto; flex-grow: 1;margin-top: -50px
`;
const StationRow = styled.div`
    display: flex; position: relative; padding-bottom: 1.5rem;
    
    &:not(:last-child)::before {
        content: ''; position: absolute; left: 10px; top: 24px; width: 2px;
        height: calc(100% - 1.5rem); background-color: #e9ecef;
    }
`;
const TimelineDot = styled.div`
    position: absolute; left: 0; top: 4px; width: 22px; height: 22px;
    background-color: white; border: 3px solid ${(props) => props.color || '#adb5bd'};
    border-radius: 50%; z-index: 1;
`;
const StationInfo = styled.div`
    padding-left: 3rem; width: 100%; display: flex;
    justify-content: space-between; align-items: center;

    /* --- RESPONSIVE CHANGE --- */
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
const StationDetails = styled.div`
    .station-name { font-size: 1rem; font-weight: 600; color: #343a40; }
    .station-code { font-size: 0.875rem; color: #868e96; }
`;
const Timings = styled.div`
    font-family: 'SF Mono', 'Fira Code', 'Roboto Mono', monospace; font-size: 0.9rem;
    text-align: right; white-space: nowrap;
    background-color: #E9ECEF;
    padding: 6px;
    border-radius: 4px;
    .arrival { color: #495057; border-bottom: 1px solid grey }
    .departure { color: #212529; font-weight: 600; }

    /* --- RESPONSIVE CHANGE --- */
    @media (max-width: 640px) {
        text-align: left;
        margin-top: 0.5rem; /* Add space between station name and timings */
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #e9ecef;
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
`;
const HaltBadge = styled.span`
    background-color: #fff3bf; color: #866100; font-size: 0.75rem;
    font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 0.5rem;
    margin-left: 0.5rem;
`;
const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
`;

// --- REACT COMPONENT ---
function ScheduleModal({ schedule, onClose, trainName }) {
  if (!schedule) return null;

  const importantStops = schedule.filter((stop, index) => {
    if (index === 0 || index === schedule.length - 1) {
      return true;
    }
    return calculateHaltDuration(stop.arrival, stop.departure) > 0;
  });

  const getDotColor = (index) => {
    if (index === 0) return '#28a745';
    if (index === importantStops.length - 1) return '#dc3545';
    return '#007bff';
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Route & Major Halts</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <RouteList>
            {importantStops.map((stop, index) => {
                const haltMinutes = calculateHaltDuration(stop.arrival, stop.departure);

                return (
                    <StationRow key={index}>
                        <TimelineDot color={getDotColor(index)} />
                        <StationInfo>
                            <StationDetails>
                                <div className="station-name">
                                    {stop.station_name}
                                    {haltMinutes > 0 && <HaltBadge>{haltMinutes} min</HaltBadge>}
                                </div>
                                <div className="station-code">{stop.station_code}</div>
                            </StationDetails>
                            <Timings>
                                <div className="arrival">{formatTime(stop.arrival)}</div>
                                <div className="departure">{formatTime(stop.departure)}</div>
                            </Timings>
                        </StationInfo>
                    </StationRow>
                );
            })}
        </RouteList>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ScheduleModal;