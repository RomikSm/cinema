import './App.css';
import { movies } from './data/movies';
import MovieList from "./components/MovieList";

function App() {
  return (
    <MovieList movies={movies}></MovieList>
  );
}

export default App;
