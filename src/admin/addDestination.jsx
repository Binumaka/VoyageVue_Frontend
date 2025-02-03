import axios from "axios";
import React, { useState } from "react";
import Navbar from "../private/components/adminNavbar";

const UploadDestination = () => {
  const [destinationData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    image1: null,
    image2: null,
    category: "",
    bestTimeToVisit: "",
    location: "",
    section: "TopDestination", // Default value
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(destinationData).forEach((key) => {
      formData.append(key, destinationData[key]);
    });

    try {
      await axios.post("/api/destination", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Destination uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        image: null,
        category: "",
        section: "TopDestination", // Reset to default
      });
      setImagePreview(null); // Clear image preview
    } catch (error) {
      console.error("Error uploading destination:", error);
      alert("Failed to upload destination. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Upload Destination
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                value={destinationData.title}
                onChange={handleInputChange}
                placeholder="Destination Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                name="description"
                value={destinationData.description}
                onChange={handleInputChange}
                placeholder="Destination Description"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                placeholder="Image"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                name="image1"
                onChange={handleFileChange}
                placeholder="Image1"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                name="image2"
                onChange={handleFileChange}
                placeholder="Image2"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="bestTimeToVisit"
                value={destinationData.bestTimeToVisit}
                onChange={handleInputChange}
                placeholder="Best Time To Visit"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="location"
                value={destinationData.location}
                onChange={handleInputChange}
                placeholder="Location"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="category"
                value={destinationData.category}
                onChange={handleInputChange}
                placeholder="Category"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                name="section"
                value={destinationData.section}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="TopDestination">Top Destination</option>
                <option value="MoretoExplore">More to Explore</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDestination;
