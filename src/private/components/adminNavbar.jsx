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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-20">
            <Link to="/destination" className="text-gray-700 hover:text-gray-900">
             Destination
            </Link>
            <Link to="/admintourpackages" className="text-gray-700 hover:text-gray-900">
             Tour Packages
            </Link>
            <Link to="/bookingAdmin" className="text-gray-700 hover:text-gray-900">
              Booking List 
            </Link>
            <Link to="/guide" className="text-gray-700 hover:text-gray-900">
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
