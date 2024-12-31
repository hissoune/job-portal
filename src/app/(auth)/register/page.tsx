"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-teal-600 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Jobify</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all ease-in-out"
              placeholder="user name"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
          </div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all ease-in-out"
              placeholder="Email Address"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 ">📧</span>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all ease-in-out"
              placeholder="Password"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg transition transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
