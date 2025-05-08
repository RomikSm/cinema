import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
    const { id, title, description, genre, poster, date, time, rating } = movie;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
                <p className="genre">{genre}</p>
                <p className="description">{description}</p>
                <div className="details">
                    <span className="date-time">{formattedDate} • {time}</span>
                    <span className="rating">{rating}/10</span>
                </div>
                <button
                    className="book-button"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default MovieCard;