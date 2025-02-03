import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../private/components/adminNavbar";

const EditGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the guide details passed from GuideList.js
  const { guide } = location.state;

  const [formData, setFormData] = useState({
    name: guide.name || "",
    email: guide.email || "",
    experience: guide.experience || "",
    contact: guide.contact || "",
    languages: guide.languages.join(", ") || "",
    availability: guide.availability || true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "availability" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/guides/${guide._id}`, {
        ...formData,
        languages: formData.languages.split(",").map((lang) => lang.trim()),
      });
      navigate("/guide");
    } catch (error) {
      console.error("Error updating guide:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Guide</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Languages (comma-separated):</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleInputChange}
                className="mr-2"
              />
              Available
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Guide
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGuide;
