import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const BookingList = () => {
  const navigate = useNavigate();
  const { userId, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Unable to fetch bookings.");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No authentication token found. Redirecting to login.");
          return;
        }

        const response = await axios.get(`/api/booking/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch bookings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  // Function to format date like "February 23, 2025"
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Delete booking function
  const deleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found. Redirecting to login.");
        return;
      }

      await axios.delete(`/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      alert("Booking cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const today = currentDate.getDate();

    // Parse the booked check-in and check-out dates
    const bookedDates = bookings.reduce((acc, booking) => {
      const checkIn = new Date(booking.checkInDate).getDate();
      const checkOut = new Date(booking.checkOutDate).getDate();
      for (let i = checkIn; i <= checkOut; i++) {
        acc.push(i);
      }
      return acc;
    }, []);

    let calendarDays = [];

    // Add empty spaces for the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="text-gray-300">
          -
        </div>
      );
    }

    // Loop through each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = bookedDates.includes(day); // Check if the day is booked
      const isToday = day === today;

      calendarDays.push(
        <div
          key={day}
          className={`p-3 text-center font-semibold rounded-lg transition-all duration-300 ${
            isToday
              ? "bg-blue-600 text-white"
              : isBooked
              ? "bg-red-200 text-white"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-700">
        <div className="font-bold text-gray-600">Mon</div>
        <div className="font-bold text-gray-600">Tue</div>
        <div className="font-bold text-gray-600">Wed</div>
        <div className="font-bold text-gray-600">Thu</div>
        <div className="font-bold text-gray-600">Fri</div>
        <div className="font-bold text-gray-600">Sat</div>
        <div className="font-bold text-gray-600">Sun</div>
        {calendarDays}
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto">
      <Navbar />
      <div className="p-8 flex flex-col md:flex-row gap-8">
        <div className="hidden md:flex flex-col w-1/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            February, 2025
          </h2>
          <div className="flex flex-col items-center">{renderCalendar()}</div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            My Bookings
          </h1>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-600">No bookings found</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="p-6 bg-white shadow-lg rounded-lg mb-6 transition-all hover:scale-105 relative"
                >
                  {/* Cancel Booking Button */}
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="absolute top-2 right-2 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <RiDeleteBin2Fill className="w-5 h-5" />
                  </button>

                  <div className="flex gap-4">
                    <img
                      src={
                        booking.accommodationId?.image
                          ? `http://localhost:3000/uploads/${booking.accommodationId?.image}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={booking.accommodationId?.title}
                      className="w-1/3 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between w-2/3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {booking.accommodationId?.title ||
                          "Unknown Accommodation"}
                      </h3>
                      <p className="text-gray-600">
                        {booking.destinationId?.title}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        Rs.{" "}
                        {booking.totalPrice
                          ? booking.totalPrice.toFixed(2)
                          : "N/A"}
                      </p>
                      <p className="text-gray-600">
                        {formatDate(booking.checkInDate)} →{" "}
                        {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
