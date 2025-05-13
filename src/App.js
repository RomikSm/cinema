import './App.css';
import Home from './pages/Home';
import Booking from './pages/Booking';
import { movies } from './data/movies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
        <Router>
            <Routes>
              <Route path="/" element={<Home movies={movies} />} />
              <Route path="/booking/:movieId" element={<Booking />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
