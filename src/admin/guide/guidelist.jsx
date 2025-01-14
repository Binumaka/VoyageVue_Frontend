import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/adminNavbar";

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get("/api/guides");
        setGuides(response.data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  const handleUpdate = (guide) => {
    // Navigate to edit page and pass guide data via state
    navigate("/editguide", { state: { guide } });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Guide List</h1>
        <div className="mb-6">
          <Link
            to="/addguide"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Guide
          </Link>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Experience</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Languages</th>
                <th className="px-4 py-2 text-center">Availability</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide) => (
                <tr key={guide._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{guide.name}</td>
                  <td className="px-4 py-2">{guide.email}</td>
                  <td className="px-4 py-2">{guide.experience}</td>
                  <td className="px-4 py-2">{guide.contact}</td>
                  <td className="px-4 py-2">{guide.languages.join(", ")}</td>
                  <td className="px-4 py-2 text-center">
                    {guide.availability ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-4">
                    <button
                      onClick={() => handleUpdate(guide)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {guides.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No guides found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuideList;
