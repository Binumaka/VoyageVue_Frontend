import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/adminNavbar";

const EditDestination = () => {
  const [destinationData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
    section: "TopDestination", // Default value
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const { id } = useParams(); // Get the destination ID from URL (if editing)
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the destination data if editing
      const fetchDestinationData = async () => {
        try {
          const response = await axios.get(`/api/destination/${id}`);
          setFormData({
            title: response.data.title,
            description: response.data.description,
            image: null, // Do not show the image initially (for preview purpose)
            category: response.data.category,
            section: response.data.section,
          });
          setImagePreview(response.data.image); // Show existing image
        } catch (error) {
          console.error("Error fetching destination data:", error);
          alert("Failed to load destination data.");
        }
      };

      fetchDestinationData();
    }
  }, [id]);

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
      await axios.put(`/api/destination/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Destination updated successfully!");
      navigate("/admin"); // Redirect to the dashboard after save
    } catch (error) {
      console.error("Error updating destination:", error);
      alert("Failed to update destination. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Edit Destination
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDestination;
