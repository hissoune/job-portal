"use client";
import Link from "next/link";
import { FaUser, FaSignInAlt } from "react-icons/fa";

export default function Navbar() {


  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <p className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition duration-300">
            Jobify
          </p>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login">
            <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
              <FaSignInAlt className="text-lg" />
              Login
            </p>
          </Link>
          <Link href="/register">
            <p className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition duration-300">
              <FaUser className="text-lg" />
              Register
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
