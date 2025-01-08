import React, { useState } from 'react';

const TravelCards = ({ headline, destinations }) => {
  const [visibleDestinations, setVisibleDestinations] = useState(3);

  const handleSeeMore = () => {
    setVisibleDestinations((prevVisibleDestinations) => prevVisibleDestinations + 3);
  };

  

  return (
    <div className="flex flex-col items-center w-full h-full">
      {headline && (
        <div className="text-4xl font-serif p-16">
          {headline}
        </div>
      )}

      <div className="flex items-center justify-center p-5 mb-12 w-full rounded-[20px]">
        {destinations && visibleDestinations < destinations.length && (
          <button onClick={handleSeeMore} className="see-more-button">
            See More
          </button>
        )}

        <div className="flex flex-wrap justify-around gap-5">
          {Array.isArray(destinations) && destinations.length > 0 ? (
            destinations.slice(0, visibleDestinations).map((item) => (
              <div
                key={item._id}
                className="relative w-[300px] h-[300px] rounded-[15px] overflow-hidden
                  shadow-md hover:transform hover:scale-105 hover:shadow-lg
                  transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={"http://localhost:3000/destinations_image/" + item.image || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/40">
                  <h2 className="m-0 text-white text-lg">{item.title}</h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No destinations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCards;