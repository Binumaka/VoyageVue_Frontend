import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TourPackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Using useParams to get the ID

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`/api/packages/${id}`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {packageDetails && (
        <div>
          {/* Display images at the top */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <img
                src={
                  packageDetails.image
                    ? `http://localhost:3000/destinations_image/${packageDetails.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={packageDetails.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <img
                src={
                  packageDetails.image1
                    ? `http://localhost:3000/destinations_image/${packageDetails.image1}`
                    : "https://via.placeholder.com/150"
                }
                alt={packageDetails.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Display title */}
          <h1 className="text-4xl font-bold text-center">{packageDetails.title}</h1>

          {/* Display Highlights */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            {packageDetails.highlights && packageDetails.highlights.length > 0 ? (
              <ul className="text-gray-700">
                {packageDetails.highlights.map((highlight, index) => (
                  <li key={index}>
                    <strong>{highlight.highlight}</strong>: {highlight.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No highlights available.</p>
            )}
          </div>

          {/* Display Itinerary */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Itinerary</h2>
            {packageDetails.itinerary && packageDetails.itinerary.length > 0 ? (
              <ul className="text-gray-700">
                {packageDetails.itinerary.map((item, index) => (
                  <li key={index}>
                    <strong>{item.day}</strong>: {item.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No itinerary available.</p>
            )}
          </div>

          {/* Display Price */}
          <div className="mt-6">
            <p className="text-lg font-bold text-blue-600">
              Price: ${packageDetails.price}
            </p>
            <p className="text-sm text-gray-500">{packageDetails.duration} days</p>
          </div>

          {/* Display Description */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-gray-700">{packageDetails.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackageDetails;
