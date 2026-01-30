"use client";

import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">

        {/* Brand */}
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-bold text-white tracking-widest">ONBLINK</span>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-7">
          <a href="/terms-and-condition">Terms & Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="contact-us">Contact Us</a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" className="hover:text-white transition">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        &copy; {year} Onblink. All rights reserved.
      </div>
    </footer>
  );
}
