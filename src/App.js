import './App.css';
import { movies } from './data/movies';
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="app-container">
        <MovieList movies={movies} />
    </div>
  );
}

export default App;
