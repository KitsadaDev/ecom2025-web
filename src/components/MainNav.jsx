import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import Avatar from "../assets/avatar.png";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-200 to-white shadow-md">
      <div className="max-w-[95%] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              to={"/"}
              style={{ fontFamily: "Permanent Marker" }}
              className="text-2xl font-bold text-gray-800"
            >
              KS SHOP
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-600 text-white transition-all duration-300 rounded-md px-4 py-2 font-medium"
                  : "text-gray-700 hover:bg-gray-300 transition-all duration-300 rounded-md px-4 py-2 font-medium"
              }
              to={"/"}
            >
              HOME
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-600 text-white transition-all duration-300 rounded-md px-4 py-2 font-medium"
                  : "text-gray-700 hover:bg-gray-300 transition-all duration-300 rounded-md px-4 py-2 font-medium"
              }
              to={"/shop"}
            >
              SHOP
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-600 text-white transition-all duration-300 rounded-md px-4 py-2 font-medium relative"
                  : "text-gray-700 hover:bg-gray-300 transition-all duration-300 rounded-md px-4 py-2 font-medium relative"
              }
              to={"/cart"}
            >
              CART
              {carts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:bg-gray-200 transition-all duration-300 rounded-md px-4 py-2 font-medium cursor-pointer"
              >
                <img
                  src={Avatar}
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <ChevronDown className="text-gray-700" />
              </button>

              {isOpen && (
                <div
                  style={{ fontFamily: "Anuphan" }}
                  className="absolute mt-2 top-12 bg-white shadow-md rounded-md z-10"
                >
                  <Link
                    to={"/user/history"}
                    className="block px-6 py-2 hover:bg-gray-200 transition-all duration-300 rounded-md"
                  >
                    การสั่งซื้อ
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block px-6 py-2 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-md cursor-pointer"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                className="bg-white text-gray-700 hover:bg-gray-200 transition-all duration-300 rounded-md px-6 py-2 font-medium shadow-md"
                to={"/register"}
              >
                Sign Up
              </Link>
              <Link
                className="bg-gray-500 text-white hover:bg-gray-700 transition-all duration-300 rounded-md px-6 py-2 font-medium shadow-md"
                to={"/login"}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
