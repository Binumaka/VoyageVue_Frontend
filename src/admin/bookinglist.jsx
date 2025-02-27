import axios from "axios";
import { Calendar, Loader2, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../private/components/adminNavbar";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking/");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Booking Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and monitor all your travel bookings
            </p>
          </div>
          <div className="rounded-lg bg-white px-6 py-3 shadow-md">
            <span className="text-lg font-semibold text-blue-600">
              {bookings.length}
            </span>
            <span className="ml-2 text-gray-600">Total Bookings</span>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-lg">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-blue-100 p-4">
              <Calendar className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-xl font-medium text-gray-800">
              No bookings found
            </p>
            <p className="mt-2 text-gray-600">
              New bookings will appear here when they're made.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() =>
                  setSelectedBooking(
                    booking._id === selectedBooking ? null : booking._id
                  )
                }
              >
                {/* Left: Image */}
                <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    src={
                      booking.accommodationId?.image
                        ? `http://localhost:3000/uploads/${booking.accommodationId.image}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={booking.accommodationId?.title || "Accommodation"}
                  />
                </div>

                {/* Right: Booking Details */}
                <div className="flex flex-col justify-between ml-6 w-full">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.accommodationId?.title || "Unknown Accommodation"}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="h-4 w-4" />
                    <div className="text-sm">
                      {booking.checkInDate
                        ? new Date(booking.checkInDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}{" "}
                      →{" "}
                      {booking.checkOutDate
                        ? new Date(booking.checkOutDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      {booking.destinationId?.title || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {booking.guideId?.name || "No guide selected"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm font-semibold">
                      $
                      {booking.totalPrice
                        ? booking.totalPrice.toFixed(2)
                        : "N/A"}
                    </span>
                  </div>

                  {/* Booking Details (if selected) */}
                  {selectedBooking === booking._id && (
                    <div className="mt-4 rounded-lg bg-blue-50 p-4">
                      <h4 className="mb-2 font-semibold text-blue-800">
                        Booking Details
                      </h4>
                      <div className="space-y-2 text-sm text-blue-700">
                        <p>Booking ID: {booking._id}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingList;
