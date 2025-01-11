import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/adminNavbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AdminDashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/destination");
        setDestinations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        alert("Failed to load destinations. Please try again.");
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/destination/${id}`);
      setDestinations((prev) => prev.filter((dest) => dest._id !== id));
      alert("Destination deleted successfully!");
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editDestination/${id}`); // Navigate to the edit page
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <div className="w-full mx-auto mb-12">
          <h1 className="w-full h-12 border border-black rounded-[20px] flex justify-center font-bold items-center">
            Available destination
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading destinations...</p>
        ) : destinations.length === 0 ? (
          <p className="text-center text-lg">No destinations available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination._id}
                className="relative w-[250px] h-[300px] rounded-[15px] overflow-hidden 
                               shadow-md hover:transform hover:scale-105 hover:shadow-lg 
                               transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={
                    "http://localhost:3000/destinations_image/" +
                    destination.image || "https://via.placeholder.com/150"
                  }
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-black/50">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white text-xl font-semibold mb-3">
                      {destination.title}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(destination._id)}
                        className="px-4 py-1 bg-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(destination._id)}
                        className="px-4 py-1 bg-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
