import { Heart, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    console.log("Navbar Rendered - isLoggedIn:", isLoggedIn, "UserId:", userId);
  }, [isLoggedIn, userId]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-8 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-xl font-serif text-black-900">
              VoyageVue
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden flex md:flex space-x-20">
            <Link
              to="/destinations"
              className="text-gray-700 hover:text-gray-900"
            >
              Destinations
            </Link>
            <Link
              to="/bookingList"
              className="text-gray-700 hover:text-gray-900"
            >
              Bookings
            </Link>
            <Link
              to="/tourpackagelist"
              className="text-gray-700 hover:text-gray-900"
            >
              Tour Packages
            </Link>
          
          {/* Icons */}
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => navigate("/bucket-list")}
            >
              <Heart className="h-6 w-6" />
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white flex items-center space-x-2 focus:outline-none"
                >
                  <User className="h-6 w-6 text-gray-700" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <button
                      onClick={() => {
                        navigate("/");
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-red-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-white px-4 py-2 rounded"
              >
                <User className="h-6 w-6 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
