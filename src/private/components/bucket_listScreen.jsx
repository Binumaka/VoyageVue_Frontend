import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Navbar from "./NavBar";

const BucketListScreen = () => {
  const [BucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBucketList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bucket-list/");
        setBucketList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching BucketList", error);
      }
    };

    fetchBucketList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bucket-list/${id}`);
      setBucketList(BucketList.filter((item) => item._id !== id)); // Remove item from state
    } catch (error) {
      console.error("Error deleting BucketList item", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-inriaSans font-bold text-center mb-6">Bucket-List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BucketList.map((destination) => (
          <div
            key={destination._id}
            className="border rounded-[20px] bg-gray-200 overflow-hidden shadow-lg relative"
          >
            <img
              src={
                destination.image
                  ? `http://localhost:3000/destinations_image/${destination.image}`
                  : "https://via.placeholder.com/150"
              }
              alt={destination.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-inter font-semibold mb-2">{destination.title}</h2>
            </div>
            {/* Heart Icon - Positioned at top right */}
            <button
              onClick={() => handleDelete(destination._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-gray-500"
            >
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BucketListScreen;
