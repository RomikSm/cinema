import React from 'react';
import MovieList from "../components/MovieList";

const Home = ({ movies }) => {
    return (
        <div className="home">
            <MovieList movies={movies} />
        </div>
    );
};

export default Home;