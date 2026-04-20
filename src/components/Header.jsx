import React, { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { LOGO_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="h-14 w-auto" src={LOGO_URL} alt="logo" />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            <li>
              <Link className="hover:text-red-600 text-black transition" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-red-600 text-black transition" to="/about">About</Link>
            </li>
            <li>
              <Link className="hover:text-red-600 text-black transition" to="/contact">Contact</Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="relative hover:text-red-600  text-black transition"
              >
                Cart 🛒
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-black text-xs px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600 text-black transition" to="/instamart">
                Instamart
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Online Status */}
          <span className="text-lg" title="Online Status">
            {isOnline ? "✅" : "🔴"}
          </span>

          {/* Login Button */}
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
