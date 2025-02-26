import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../private/components/adminNavbar";

const EditTourPackage = () => {
  const [tourData, setTourData] = useState({
    title: "",
    image: "",
    image1: "",
    highlights: [],
    itinerary: [],
    price: "",
    duration: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing tour package details
  useEffect(() => {
    if (id) {
      const fetchTourPackageData = async () => {
        try {
          const response = await axios.get(`/api/packages/${id}`);
          setTourData({
            title: response.data.title,
            image: response.data.image,
            image1: response.data.image1,
            highlights: response.data.highlights || [],
            itinerary: response.data.itinerary || [],
            price: response.data.price,
            duration: response.data.duration,
            description: response.data.description,
          });
          setImagePreview(response.data.image);
          setImage1Preview(response.data.image1);
        } catch (error) {
          console.error("Error fetching tour package data:", error);
          alert("Failed to load tour package data.");
        } finally {
          setLoading(false);
        }
      };
      fetchTourPackageData();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      setTourData((prev) => ({ ...prev, [imageKey]: file }));
      if (imageKey === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImage1Preview(URL.createObjectURL(file));
      }
    }
  };

  // Handle list fields like highlights & itinerary
  const handleListChange = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setTourData((prev) => ({ ...prev, [field]: values }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    Object.keys(tourData).forEach((key) => {
      if (Array.isArray(tourData[key])) {
        // Instead of stringifying, append each item separately
        tourData[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, tourData[key]);
      }
    });
  
    try {
      await axios.put(`/api/packages/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tour Package updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating tour package:", error);
      alert("Failed to update tour package. Please try again.");
    }
  };
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Tour Package</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Package Title */}
            <input
              type="text"
              name="title"
              value={tourData.title}
              onChange={handleInputChange}
              placeholder="Package Name"
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Primary Image Upload */}
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileChange(e, "image")}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded mt-4" />
            )}

            {/* Secondary Image Upload */}
            <input
              type="file"
              name="image1"
              onChange={(e) => handleFileChange(e, "image1")}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {image1Preview && (
              <img src={image1Preview} alt="Preview" className="w-full h-48 object-cover rounded mt-4" />
            )}

            {/* Highlights (Comma-separated) */}
            <input
              type="text"
              name="highlights"
              value={tourData.highlights.join(", ")}
              onChange={(e) => handleListChange(e, "highlights")}
              placeholder="Highlights (comma-separated)"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Itinerary (Comma-separated) */}
            <input
              type="text"
              name="itinerary"
              value={tourData.itinerary.join(", ")}
              onChange={(e) => handleListChange(e, "itinerary")}
              placeholder="Itinerary (comma-separated)"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Price Input */}
            <input
              type="number"
              name="price"
              value={tourData.price}
              onChange={handleInputChange}
              placeholder="Price (in USD)"
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Duration Input */}
            <input
              type="text"
              name="duration"
              value={tourData.duration}
              onChange={handleInputChange}
              placeholder="Duration (e.g., 5 days, 1 week)"
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            {/* Description Input */}
            <textarea
              name="description"
              value={tourData.description}
              onChange={handleInputChange}
              placeholder="Package Description"
              required
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">
              Update Package
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTourPackage;
