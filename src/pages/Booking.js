import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import '../styles/Booking.css';

const Booking = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        // Find the movie by ID
        const selectedMovie = movies.find(m => m.id === parseInt(movieId));

        // If movie not found, redirect to home page
        if (!selectedMovie) {
            navigate('/');
            return;
        }

        setMovie(selectedMovie);
    }, [movieId, navigate]);

    if (!movie) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="booking">
            <div className="booking-header">
                <h1>Book Tickets for {movie.title}</h1>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back to Movies
                </button>
            </div>

            <div className="movie-info">
                <img 
                    src={movie.poster} 
                    alt={`${movie.title} poster`} 
                    className="movie-poster"
                />
                <div className="movie-details">
                    <h2>{movie.title}</h2>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Date:</strong> {movie.date[0]}</p>
                    <p><strong>Time:</strong> {movie.time[0]}</p>
                </div>
            </div>

            <CinemaHall />

            <div className="booking-actions">
                <button className="confirm-booking">
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default Booking;
