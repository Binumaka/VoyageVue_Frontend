import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const CategoryBar = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [categoryDestinations, setCategoryDestinations] = useState({});
  const [visibleIndex, setVisibleIndex] = useState(0); // Controls pagination

  const predefinedCategories = [
    { name: "HimalayanTreks" },
    { name: "Cultural Heritage" },
    { name: "city" },
    { name: "Lake and River" },
    { name: "National park" },
    { name: "Wild Life" },
    { name: "Temple And Monastries" },
    { name: "Nature" },
    { name: "Adventure" },
    { name: "Camping" },
    { name: "Festival And Event" }
  ];

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/destination");
      const data = await response.json();

      const destinationsMap = predefinedCategories.reduce((acc, category) => {
        acc[category.name] = 0;
        return acc;
      }, {});

      data.forEach(item => {
        if (destinationsMap[item.category] !== undefined) {
          destinationsMap[item.category]++;
        }
      });

      setCategoryDestinations(destinationsMap);

      const firstAvailableCategory = predefinedCategories.find(cat => destinationsMap[cat.name] > 0)?.name || predefinedCategories[0].name;
      setSelectedCategory(firstAvailableCategory);
      onCategorySelect(firstAvailableCategory);
    } catch (err) {
      setError("Failed to load destinations");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (categoryDestinations[category] === 0) {
      onCategorySelect(null, "No destinations available in this category");
    } else {
      onCategorySelect(category);
    }
  };

  const handleNext = () => {
    if (visibleIndex + 2 < predefinedCategories.length) {
      setVisibleIndex(visibleIndex + 2);
    }
  };

  const handlePrev = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 2);
    }
  };

  if (error) {
    return (
      <div className="w-full bg-red-50 rounded-lg">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray/50 pt-8 pb-4 shadow-md">
      <div className="flex items-center justify-between">
        {visibleIndex > 0 && (
          <button
            onClick={handlePrev}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        )}

        <div className="grid grid-cols-8 gap-4 w-full pl-6">
          {predefinedCategories.slice(visibleIndex, visibleIndex + 8).map(({ name }) => (
            <button
              key={name}
              onClick={() => handleCategoryClick(name)}
              className={`flex flex-col items-center transition-all duration-300 ${
                selectedCategory === name ? "rounded-lg ring-2 ring-blue-400 ring-offset-2 transform scale-105 text-blue-800 font-bold" 
                : "hover:scale-105"
              }`}
            >
              <span className="text-sm font-medium whitespace-nowrap text-center">{name}</span>
            </button>
          ))}
        </div>

        {visibleIndex + 8 < predefinedCategories.length && (
          <button
            onClick={handleNext}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
