import React from 'react';
import '../styles/MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const { id, title, description, genre, poster, date, time, rating } = movie;
    const navigate = useNavigate();

    const handleBooking = () => {
        navigate(`/booking/${id}`);
    };

    return (
        <div className="card">
            <div className="poster-container">
                <img
                    className="poster"
                    src={poster}
                    alt={`${title} poster`}
                />
            </div>
            <div className="content">
                <h2 className="title">{title}</h2>
                <div className="bottom-content">
                    <p className="genre">{genre}</p>
                    <p className="description" title={description}>{description}</p>
                    <div className="details">
                        <span className="rating">{rating}/10</span>
                    </div>
                    <button
                        className="book-button"
                        onClick={handleBooking}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
