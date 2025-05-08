import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
    const { id, title, description, genre, poster, date, time, rating } = movie;

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
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
