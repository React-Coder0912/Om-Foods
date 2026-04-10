
import React,{ useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import {LOGO_URL} from "../utils/constants";
import { FaCheckCircle } from 'react-icons/fa';


const Title = () => (
  <a href="/">
    <img className="h-28 p-2" src={LOGO_URL} alt="logo"/>
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
      <Title />
      <div className="flex items-center">
        <ul className="flex py-10">
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>

          <Link to="/about">
            <li className="px-2">About</li>
          </Link>
          <Link to="/contact">
            <li className="px-2">Contact</li>
          </Link>
          <li className="px-2">Cart</li>
          <Link to="/Instamart">
            <li className="px-2">Instamart</li>
          </Link>
        </ul>
      </div>
      <h1>{isOnline ? "✅" : "🔴"}</h1>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;