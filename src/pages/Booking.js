import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import { BookingService } from '../services/BookingService';
import '../styles/Booking.css';

const Booking = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const selectedMovie = movies.find(m => m.id === parseInt(movieId));

        if (!selectedMovie) {
            navigate('/');
            return;
        }

        setMovie(selectedMovie);
    }, [movieId, navigate]);

    const handleSeatsChange = (seats) => {
        setSelectedSeats(seats);
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
            errors.phone = "Please enter a valid phone number";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            const booking = {
                movieId: parseInt(movieId),
                seats: selectedSeats,
                customer: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email
                },
                date: new Date().toISOString()
            };

            try {
                BookingService.saveBooking(movieId, booking);

                toast.success("Booking successful! Your tickets have been reserved.", {
                    position: "top-center",
                    autoClose: 5000
                });

                setFormData({ name: '', phone: '', email: '' });
                setSelectedSeats([]);
                setShowForm(false);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                toast.error("An error occurred while processing your booking. Please try again.", {
                    position: "top-center"
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!movie) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="booking">
            <ToastContainer />

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

            <CinemaHall movieId={parseInt(movieId)} onSeatsChange={handleSeatsChange} />

            {showForm ? (
                <div className="booking-form">
                    <h3>Complete Your Booking</h3>
                    <form onSubmit={handleBookingSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                            />
                            {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                            {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                            />
                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                        </div>

                        <div className="booking-actions">
                            <button 
                                type="button" 
                                className="back-button" 
                                onClick={() => setShowForm(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="confirm-booking"
                                disabled={isSubmitting || selectedSeats.length === 0}
                            >
                                {isSubmitting ? "Processing..." : "Confirm Booking"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="booking-actions">
                    <button 
                        className="confirm-booking"
                        onClick={() => setShowForm(true)}
                        disabled={selectedSeats.length === 0}
                    >
                        Book Selected Seats ({selectedSeats.length})
                    </button>
                </div>
            )}
        </div>
    );
};

export default Booking;
