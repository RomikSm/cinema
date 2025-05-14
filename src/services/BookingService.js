const BOOKINGS_STORAGE_KEY = 'cinema_bookings';

const getAllBookings = () => {
  const bookingsJson = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return bookingsJson ? JSON.parse(bookingsJson) : {};
};

const getBookingsByMovieId = (movieId) => {
  const allBookings = getAllBookings();
  return allBookings[movieId] || [];
};

const saveBooking = (movieId, booking) => {
  const allBookings = getAllBookings();

  if (!allBookings[movieId]) {
    allBookings[movieId] = [];
  }

  allBookings[movieId].push(booking);
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(allBookings));

  return booking;
};

const isSeatBooked = (movieId, seatId) => {
  const bookings = getBookingsByMovieId(movieId);

  return bookings.some(booking => 
    booking.seats.includes(seatId)
  );
};

const getBookedSeats = (movieId) => {
  const bookings = getBookingsByMovieId(movieId);

  return bookings.reduce((allSeats, booking) => {
    return [...allSeats, ...booking.seats];
  }, []);
};

export const BookingService = {
  getBookingsByMovieId,
  saveBooking,
  isSeatBooked,
  getBookedSeats
};
