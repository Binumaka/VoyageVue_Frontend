import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryBar = () => {
  const categories = [
    {
      imageUrl: '/src/images/categories/himalayantreks.png',
      title: 'Himalayan Treks'
    },
    {
      imageUrl: '/src/images/categories/culturalheritage.png', 
      title: 'Cultural Heritage'
    },
    {
      imageUrl: '/src/images/categories/city.png',
      title: 'City'
    },
    {
      imageUrl: '/src/images/categories/lake.png',
      title: 'Lake and River'
    },
    {
      imageUrl: '/src/images/categories/nationalpark.png',
      title: 'National Park'
    },
    {
      imageUrl: '/src/images/categories/wildlife.png',
      title: 'Wild Life'
    },
    {
      imageUrl: '/src/images/categories/temple.png',
      title: 'Temple and Monastries'
    },
    {
      imageUrl: '/src/images/categories/nature.png',
      title: 'Nature'
    },
    {
      imageUrl: '/src/images/categories/adventure.png',
      title: 'Adventure'
    },
    {
      imageUrl: '/src/images/categories/camping.png',
      title: 'Camping'
    },
    {
      imageUrl: '/src/images/categories/festivalEvent.png',
      title: 'Festival And Event'
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 8;
  const endIndex = startIndex + itemsPerPage;

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex(Math.min(startIndex + itemsPerPage, categories.length - itemsPerPage));
  };

  const visibleCategories = categories.slice(startIndex, endIndex);

  return (
    <div className="flex items-center w-full space-x-4 px-4 bg-white py-4">
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow"
        >
          <img src="/src/images/left-chevron.png" alt="Previous" className="w-6 h-6" />
        </button>
      )}

      <div className="flex flex-grow justify-between">
      {visibleCategories.map((category, index) => (
        <div key={index} className="text-center">
          <Link to={`/category/${category}`}>
            <img
              src={category.imageUrl}
              alt={category.title}
              className="w-8 h-10 object-cover mx-auto mb-2 rounded-md"
            />
            <div className="text-sm font-medium text-gray-700">{category.title}</div>
          </Link>
        </div>
      ))}
      </div>

      {endIndex < categories.length && (
        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow"
        >
          <img src="/src/images/chevron.png" alt="Next" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default CategoryBar;