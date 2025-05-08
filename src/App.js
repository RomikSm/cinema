import './App.css';
import { movies } from './data/movies';
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="app-container">
      <div className="fade-in">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
