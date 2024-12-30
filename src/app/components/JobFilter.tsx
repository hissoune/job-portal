'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

interface JobFilterProps {
  initialValues: {
    search?: string;
    location?: string;
    salary?: string;
    date?: string;
  };
}

export default function JobFilter({ initialValues }: JobFilterProps) {
  const [search, setSearch] = useState(initialValues.search || '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [salary, setSalary] = useState(initialValues.salary || '');
  const [date, setDate] = useState(initialValues.date || '');

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (search) searchParams.append('search', search);
    if (location) searchParams.append('location', location);
    if (salary) searchParams.append('salary', salary);
    if (date) searchParams.append('date', date);
    router.push(`/dashboard?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filter Jobs</h2>
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-600 mb-2">Search</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by job title..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-600 mb-2">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="salary" className="block text-gray-600 mb-2">Minimum Salary</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter minimum salary..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-600 mb-2">Posted After</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white px-6 py-2 rounded-full w-full hover:bg-indigo-600 transition duration-200"
      >
        Apply Filters
      </button>
    </form>
  );
}

