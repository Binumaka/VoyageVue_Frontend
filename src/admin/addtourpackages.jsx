import React, { useState } from "react";
import axios from "axios";
import Navbar from "../private/components/adminNavbar";

const UploadTourPackage = () => {
  const [tourData, setTourData] = useState({
    title: "",
    image: null,
    image1: null,
    highlights: [],
    itinerary: [],
    price: "",
    duration: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle array inputs (highlights, itinerary)
  const handleArrayChange = (e, field) => {
    const { name, value } = e.target;
    const updatedField = [...tourData[field]];

    if (name === "day" || name === "description") {
      const index = updatedField.length;
      updatedField.push({
        day: name === "day" ? value : updatedField[index]?.day,
        description: name === "description" ? value : updatedField[index]?.description,
      });
    }

    setTourData((prev) => ({ ...prev, [field]: updatedField }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      setTourData((prev) => ({ ...prev, [name]: file }));

      if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      } else if (name === "image1") {
        setImagePreview1(URL.createObjectURL(file));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
      if (Array.isArray(tourData[key])) {
        formData.append(key, JSON.stringify(tourData[key])); // Convert array to JSON string
      } else {
        formData.append(key, tourData[key]);
      }
    });

    try {
      await axios.post("/api/packages/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Tour Package uploaded successfully!");

      setTourData({
        title: "",
        image: null,
        image1: null,
        highlights: [],
        itinerary: [],
        price: "",
        duration: "",
        description: "",
      });

      setImagePreview(null);
      setImagePreview1(null);
    } catch (error) {
      console.error("Error uploading tour package:", error);
      alert("Failed to upload tour package. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Upload Tour Package
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              name="title"
              value={tourData.title}
              onChange={handleInputChange}
              placeholder="Package Name"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Image Upload */}
            <div>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Second Image Upload */}
            <div>
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview1 && (
                <div className="mt-4">
                  <img
                    src={imagePreview1}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* Highlights */}
            <div>
              <input
                type="text"
                name="day"
                placeholder="Day"
                onChange={(e) => handleArrayChange(e, "highlights")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="description"
                placeholder="Highlight Description"
                onChange={(e) => handleArrayChange(e, "highlights")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Itinerary */}
            <div>
              <input
                type="text"
                name="day"
                placeholder="Day"
                onChange={(e) => handleArrayChange(e, "itinerary")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="description"
                placeholder="Itinerary Description"
                onChange={(e) => handleArrayChange(e, "itinerary")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <input
              type="number"
              name="price"
              value={tourData.price}
              onChange={handleInputChange}
              placeholder="Price (in USD)"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Duration */}
            <input
              type="text"
              name="duration"
              value={tourData.duration}
              onChange={handleInputChange}
              placeholder="Duration (e.g., 5 days, 1 week)"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description */}
            <textarea
              name="description"
              value={tourData.description}
              onChange={handleInputChange}
              placeholder="Package Description"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadTourPackage;
