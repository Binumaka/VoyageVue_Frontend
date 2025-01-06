import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const images = [
    "/src/images/firstimg.png",
    "/src/images/loginimg.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}
      <div className="w-1/2 p-12 flex flex-col justify-center relative overflow-hidden">
        <h1 className="text-3xl font-inriaSans font-medium text-center text-black mb-2">
          Adventure awaits, just one click away with VoyageVue
        </h1>
        <div className="mt-8 flex justify-center">
          <img
            src={images[currentImage]}
            className="w-3/4 h-auto object-contain transition-opacity duration-1000"
            alt="Travel illustration"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center p-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-12 border-2 border-black-900">
          <h2 className="text-3xl font-inriaSans font-normal mb-6 text-center">
            Log In
          </h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData({ ...data, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-transparent rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                className="w-full px-3 py-2 bg-transparent rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.rememberMe}
                  onChange={(e) =>
                    setData({ ...data, rememberMe: e.target.checked })
                  }
                  className="mr-2 rounded border-2 border-gray-300 text-[#0F172A] focus:ring-[#0F172A]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-blue-900 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-[#0F172A] text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#0F172A]"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#0F172A] hover:text-blue-900 hover:underline font-medium"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
