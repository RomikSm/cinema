import React, { useState } from 'react';
import '../styles/CinemaHall.css';

const CinemaHall = () => {
    const rows = 8;
    const seatsPerRow = 10;

    // State to track selected seats
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Handle seat selection
    const toggleSeatSelection = (row, seat) => {
        const seatId = `${row}-${seat}`;

        // Check if the seat is already selected
        if (selectedSeats.includes(seatId)) {
            // If selected, remove it from the array
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            // If not selected, add it to the array
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    // Generate the cinema hall grid
    const renderSeats = () => {
        const seatRows = [];

        for (let row = 1; row <= rows; row++) {
            const seats = [];

            for (let seat = 1; seat <= seatsPerRow; seat++) {
                const seatId = `${row}-${seat}`;
                const isSelected = selectedSeats.includes(seatId);

                seats.push(
                    <div 
                        key={seatId} 
                        className={`seat ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleSeatSelection(row, seat)}
                    >
                        {seat}
                    </div>
                );
            }

            seatRows.push(
                <div key={`row-${row}`} className="row">
                    <div className="row-number">{row}</div>
                    <div className="seats">{seats}</div>
                </div>
            );
        }

        return seatRows;
    };

    // Format selected seats for display
    const formatSelectedSeats = () => {
        if (selectedSeats.length === 0) {
            return "No seats selected";
        }

        return selectedSeats
            .sort((a, b) => {
                const [rowA, seatA] = a.split('-').map(Number);
                const [rowB, seatB] = b.split('-').map(Number);

                if (rowA === rowB) {
                    return seatA - seatB;
                }
                return rowA - rowB;
            })
            .map(seatId => {
                const [row, seat] = seatId.split('-');
                return `Row ${row}, Seat ${seat}`;
            })
            .join('; ');
    };

    return (
        <div className="cinema-hall">
            <h2>Select Your Seats</h2>

            <div className="screen">
                <div className="screen-text">SCREEN</div>
            </div>

            <div className="seating-layout">
                {renderSeats()}
            </div>

            <div className="selected-seats">
                <h3>Selected Seats:</h3>
                <p>{formatSelectedSeats()}</p>
            </div>
        </div>
    );
};

export default CinemaHall;
