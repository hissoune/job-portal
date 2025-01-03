"use client"; // Add this directive at the top of your file
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie"; 

export default function ApplyJob({ params }: { params: Promise<{ jobId: string }> }) {
  const router = useRouter();
  const { jobId } = use(params);

  const [user, setUser] = useState({id:"", name: "", email: "" }); // Initialize with default empty values
  const [note, setNote] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user_data");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser); 
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.warn("No user data found in cookies.");
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("jobTitle", jobId);
    formData.append("note", note);
    if (resume) formData.append("resume", resume);
  
    // Log the FormData key-value pairs
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value); // This ensures you see what is being sent
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/application/create", {
        method: "POST",
        body: formData, // Use the FormData instance directly
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("Error response from server:", error);
        throw new Error("Failed to submit the application");
      }
  
      console.log("Application submitted successfully");
      router.push("/applications");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-8 md:p-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <Link
            href={`/jobs/${jobId}`}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
          >
            &larr; Back to Job Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Apply for Job
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={user.id} 
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
              <input
                type="text"
                id="name"
                name="name"
                value={user.name} 
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email} // Controlled input
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={jobId} // Controlled input
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={note} // Controlled input
                onChange={(e) => setNote(e.target.value)} // Update state on input change
                placeholder="Write your note here..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)} // Handle file upload
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
