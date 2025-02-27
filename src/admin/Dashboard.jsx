import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchGuides();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/booking");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGuides = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/guides");
      setGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/api/${activeTab}/${id}`);
        if (activeTab === "bookings") {
          setBookings(bookings.filter((item) => item._id !== id));
        } else if (activeTab === "users") {
          setUsers(users.filter((item) => item._id !== id));
        } else if (activeTab === "guides") {
          setGuides(guides.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        
        <div className="w-64 bg-gray-600 text-white p-6">
          <nav>
            <div className="text-3xl text-center text-blue-100 font-medium font-inriaSans ">
            <p> VoyageVue</p>
            </div>
            <div className=" p-6">
            <div
              className="px-6 py-3 flex items-center hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/destinations")}
            >
              <span>Destinations </span>
            </div>
            <div
              className="px-6 py-3 flex items-center hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/admintourpackages")}
            >
              <span>Tour Packages </span>
            </div>
            <div
              className="px-6 py-3 flex items-center hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/bookingAdmin")}
            >
              <span>Bookings </span>
            </div>
            <div
              className="px-6 py-3 flex items-center hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/userlist")}
            >
              <span>User List</span>
            </div>
            <div
              className="px-6 py-3 flex items-center hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("/guide")}
            >
              <span>Guide List</span>
            </div>
            </div>
          </nav>
          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={handleLogout}
              className="flex items-center text-white opacity-75 hover:opacity-100"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header for Active Tab */}
          <header className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === "bookings" && "Booking Management"}
              {activeTab === "users" && "User Management"}
              {activeTab === "guides" && "Guide Management"}
            </h2>
            {activeTab === "bookings" && (
              <Link
                to="/add-booking"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Add Booking
              </Link>
            )}
            {activeTab === "users" && (
              <Link
                to="/add-user"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Add User
              </Link>
            )}
            {activeTab === "guides" && (
              <Link
                to="/add-guide"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                Add Guide
              </Link>
            )}
          </header>

          {/* Main Table Content */}
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              {activeTab === "bookings" && (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left">Booking ID</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Destination</th>
                      <th className="px-6 py-3 text-left">Travel Date</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-3">{booking._id}</td>
                        <td className="px-6 py-3">{booking.customerName}</td>
                        <td className="px-6 py-3">{booking.destination}</td>
                        <td className="px-6 py-3">{booking.travelDate}</td>
                        <td className="px-6 py-3">{booking.amount}</td>
                        <td className="px-6 py-3">{booking.status}</td>
                        <td className="px-6 py-3 flex space-x-2">
                          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(booking._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "users" && (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left">User ID</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-3">{user._id}</td>
                        <td className="px-6 py-3">{user.name}</td>
                        <td className="px-6 py-3">{user.email}</td>
                        <td className="px-6 py-3">{user.status}</td>
                        <td className="px-6 py-3 flex space-x-2">
                          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "guides" && (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left">Guide ID</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Destination</th>
                      <th className="px-6 py-3 text-left">Experience</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guides.map((guide) => (
                      <tr key={guide._id}>
                        <td className="px-6 py-3">{guide._id}</td>
                        <td className="px-6 py-3">{guide.name}</td>
                        <td className="px-6 py-3">{guide.destination}</td>
                        <td className="px-6 py-3">{guide.experience}</td>
                        <td className="px-6 py-3 flex space-x-2">
                          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(guide._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
