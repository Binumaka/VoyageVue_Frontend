import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/adminNavbar";

const UploadTourPackage = () => {
  const [tourData, setFormData] = useState({
    title: "",
    image: null,
    highlights: "",
    itinerary: "",
    price: "",
    duration: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null); 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    Object.keys(tourData).forEach((key) => {
      formData.append(key, tourData[key]);
    });

    try {
      await axios.post("/api/packages/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tour Package uploaded successfully!");
      setFormData({
        title: "",
        image: null,
        highlights: "",
        itinerary: "",
        price: "",
        duration: "",
        description: "",
      });
      setImagePreview(null);
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
            <div>
              <input
                type="text"
                name="title"
                value={tourData.title}
                onChange={handleInputChange}
                placeholder="Package Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="highlights"
                value={tourData.highlights}
                onChange={handleInputChange}
                placeholder="Highlights"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="itinerary"
                value={tourData.itinerary}
                onChange={handleInputChange}
                placeholder="Itinerary"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={tourData.price}
                onChange={handleInputChange}
                placeholder="Price (in USD)"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="duration"
                value={tourData.duration}
                onChange={handleInputChange}
                placeholder="Duration (e.g., 5 days, 1 week)"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                name="description"
                value={tourData.description}
                onChange={handleInputChange}
                placeholder="Package Description"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
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

export default UploadTourPackage;
