import React from "react";
import { Compass, Send, Shield, Book, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Compass className="mr-2" size={24} />
              VoyageVue
            </h3>
            <p className="text-sm text-purple-100 mb-4">
              Adventure awaits, just one click away with VoyageVue
            </p>
            <div className="mt-4">
              <a
                href="/about"
                className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded text-sm inline-block mr-2"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="bg-transparent hover:bg-purple-700 text-white border border-purple-400 px-4 py-2 rounded text-sm inline-block"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-indigo-200 hover:text-white text-sm flex items-center"
                >
                  <Shield className="mr-2" size={16} /> Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-indigo-200 hover:text-white text-sm flex items-center"
                >
                  <Book className="mr-2" size={16} /> Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-indigo-200 hover:text-white text-sm flex items-center"
                >
                  <Send className="mr-2" size={16} /> FAQ
                </a>
              </li>
              <li>
                <a
                  href="/destinations"
                  className="text-indigo-200 hover:text-white text-sm flex items-center"
                >
                  <Compass className="mr-2" size={16} /> Destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-white-700 mt-6 pt-4 flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <p className="text-xs text-indigo-200">
            © {new Date().getFullYear()} VoyageVue. All Rights Reserved.
          </p>
          <p className="text-xs text-indigo-300 mt-2 md:mt-0">
            Designed with <span className="text-pink-400">♥</span> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}