"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logoText from "@/assets/logo-text.png";
import Image from "next/image";
import { logout } from "@/lib/auth";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const hasAccessToken = document.cookie
      .split("; ")
      .some((c) => c.startsWith("access_token="));

    setIsLoggedIn(hasAccessToken);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <nav
      className="fixed w-full z-20 top-0 left-0 transition-all duration-300 bg-white "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 h-16 w-full flex items-center overflow-hidden">
            <Link href="/" className="flex items-center h-full">
              <Image
                src={logoText}
                alt="ONBLINK Logo"
                className="h-16 w-auto scale-230 origin-left translate-y-2"
                priority
              />
            </Link>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-black font-semibold rounded-sm p-2 hover:bg-gray-200 hover:text-blue-500"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border-white font-semibold rounded-sm text-black p-2 hover:bg-gray-200 hover:text-blue-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  <FaUserCircle
                    className="text-gray-800 h-8 w-auto"
                  />
                  <span
                    className="text-gray-800"
                  >
                    Profile
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                    <Link
                      href="/history"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white focus:outline-none"
            >
              {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md mt-2 rounded-lg p-4 space-y-2">

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/history"
                  className="block px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
