import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../private/components/adminNavbar";

const TourPackageView = () => {
  const [Packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const response = await axios.get("/api/packages/find");
        setPackages(response.data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching tour packages:", error);
        alert("Failed to load tour packages. Please try again.");
        setLoading(false);
      }
    };
    fetchTourPackage();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/packages/${id}`);
      setDestinations((prev) => prev.filter((tour) => tour._id !== id));
      alert("Tour packages deleted successfully!");
    } catch (error) {
      console.error("Error deleting Tour packages:", error);
      alert("Failed to delete Tour packages.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editPackages/${id}`); // Navigate to the edit page
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <div className="w-full mx-auto mb-12">
          <h1 className="w-full h-12 border border-black rounded-[20px] flex justify-center font-bold items-center">
            Available Tour Packages
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading tour packages...</p>
        ) : Packages.length === 0 ? (
          <p className="text-center text-lg">No tour packages available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Packages.map((packages) => (
              <div
                key={packages._id}
                className="relative w-[250px] h-[300px] rounded-[15px] overflow-hidden 
                               shadow-md hover:transform hover:scale-105 hover:shadow-lg 
                               transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={
                    "http://localhost:3000/destinations_image/" +
                      packages.image || "https://via.placeholder.com/150"
                  }
                  alt={packages.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-black/50">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white text-xl font-semibold mb-3">
                      {packages.title}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(packages._id)}
                        className="px-4 py-1 bg-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(packages._id)}
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

export default TourPackageView;
