import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryBar from "../components/categoryBar";
import Navbar from "../components/NavBar";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [Bucketlist, setBucketlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      fetchDestinations();
    }
  }, [selectedCategory]);

  const fetchDestinations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/destination/category/${selectedCategory}`
      );
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      setError("Failed to load destinations");
    }
    setLoading(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const gotoDestinationDetails = (id) => {
    navigate(`/destinationdetails/${id}`);
  };

  const toggleBucketList = async (destination) => {
    try {
      const isAlreadyInBucketList = Bucketlist.some(
        (item) => item._id === destination._id
      );

      if (isAlreadyInBucketList) {
        setBucketlist(
          Bucketlist.filter((item) => item._id !== destination._id)
        );
      } else {
        setBucketlist([...Bucketlist, destination]);
        await axios.post("http://localhost:3000/api/bucket-list/", destination);
      }
    } catch (error) {
      console.error("Failed to update bucketlist", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <CategoryBar onCategorySelect={handleCategorySelect} />
      <div className="p-8">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="relative w-[340px] h-[300px] rounded-[12px] overflow-hidden
              shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
            >
              <img
                src={
                  destination.image
                    ? `http://localhost:3000/destinations_image/${destination.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={destination.title}
                className="w-full h-full object-cover"
                onClick={() => gotoDestinationDetails(destination._id)}
              />
              {/* Favorite button */}
              <FaHeart
                className={`absolute top-4 right-4 cursor-pointer text-2xl ${
                  Bucketlist.some((item) => item._id === destination._id)
                    ? "text-red-600"
                    : "text-gray-500 hover:text-red-600"
                }`}
                onClick={() => toggleBucketList(destination)}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                <h2 className="m-0 text-white text-lg">{destination.title}</h2>
                <p className="text-sm text-white/70 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
