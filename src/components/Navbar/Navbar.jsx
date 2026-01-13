import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
 const [isChecked, setIsChecked] = useState(false);

 useEffect(() => {
   document.documentElement.setAttribute(
     "data-theme",
     isChecked ? "dark" : "light"
   );
 }, [isChecked]);

 const handleThemeChange = () => {
   setIsChecked((prev) => !prev);
 };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/services" className="font-semibold">
          Pets & Supplies
        </NavLink>
      </li>


      
      {user && (
        <>
          <li>
            <NavLink to="/profile" className="font-semibold">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-services" className="font-semibold">
              Add Listing
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-services" className="font-semibold">
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-orders" className="font-semibold">
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-lg mt-3 w-52 shadow">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="text-xl font-bold text-purple-600">
          🐾 Winter Pets
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end" >
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
          onClick={handleThemeChange}
            type="checkbox"

            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://i.ibb.co/YT9W8wM/default-user.png"}
              className="w-10 h-10 rounded-full border-2 border-purple-500"
            />
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-sm btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
