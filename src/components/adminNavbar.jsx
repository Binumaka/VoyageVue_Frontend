import { useState } from 'react';
import { Search, Heart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/admin" className="text-xl font-serif text-black-900">
              VoyageVue
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Places here ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-20">
            <Link to="/destination" className="text-gray-700 hover:text-gray-900">
             Destination
            </Link>
            <Link to="/bookinglist" className="text-gray-700 hover:text-gray-900">
              Booking List 
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Guide List
            </Link>
            <Link to="/add" className="text-gray-700 hover:text-gray-900">
              Upload
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-14">
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => navigate('/login')}
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
