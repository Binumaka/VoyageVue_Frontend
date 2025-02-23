import React, { useState } from "react";
import {Clock} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const TourCards = ({ headline, destinations }) => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 4;
  const endIndex = startIndex + itemsPerPage;

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex(
      Math.min(startIndex + itemsPerPage, destinations.length - itemsPerPage)
    );
  };

  const gototourpackagesdetails = (id) => {
    navigate(`/tourpackagesdetails/${id}`);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-white/5">
      {headline && <div className="text-4xl font-serif p-8">{headline}</div>}

      <div className="flex items-center justify-center mb-12 w-full rounded-[20px]">
        {/* Pagination buttons */}
        <div className="flex items-center space-x-4">
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-black/3"
            >
              <img
                src="/src/images/left-chevron.png"
                alt="Previous"
                className="w-6 h-6"
              />
            </button>
          )}
          <div className="flex flex-wrap justify-between gap-8">
            {Array.isArray(destinations) && destinations.length > 0 ? (
              destinations.slice(startIndex, endIndex).map((destination) => (
                <div
                  key={destination._id}
                  className="relative w-[320px] h-[300px] rounded-[12px] overflow-hidden
                  shadow-md hover:transform hover:scale-105 hover:shadow-lg
                  transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={
                      "http://localhost:3000/destinations_image/" +
                      destination.image || "https://via.placeholder.com/150"
                    }
                    alt={destination.title}
                    className="w-full h-full object-cover"
                    onClick={() => gototourpackagesdetails(destination._id)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40">
                    <h2 className="m-0 text-white text-lg">{destination.title}</h2>
                    <h2 className="m-0 text-white text-lg">$ {destination.price}</h2>
                  </div>
                  <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-red-700" />
                          <span className="text-sm font-medium text-gray-800">
                            {destination.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No destinations available.</p>
            )}
          </div>
          {endIndex < destinations.length && (
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-black/3"
            >
              <img
                src="/src/images/chevron.png"
                alt="Next"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCards;
