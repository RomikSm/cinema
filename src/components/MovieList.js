import React, { useState } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="page-title">Cinema Experience</h1>
            <div className="search-container">
                <input 
                    className="search-input"
                    placeholder="Search for movies..." 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                />
            </div>
            <div className="movies-grid">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
