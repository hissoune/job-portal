'use client'

import { useState } from 'react';
import { Application } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ApplicationListProps {
  initialApplications: Application[];
}

export default function ApplicationList({ initialApplications }: ApplicationListProps) {
    const [applications, setApplications] = useState(initialApplications);
  
    const handleDelete = (id: string) => {
      setApplications(applications.filter(app => app._id !== id));
    };
  
    const getStatusColor = (status: Application['status']) => {
      switch (status) {
        case 'pending': return 'bg-yellow-500 text-yellow-900';
        case 'reviewed': return 'bg-blue-500 text-blue-900';
        case 'rejected': return 'bg-red-500 text-red-900';
        case 'accepted': return 'bg-green-500 text-green-900';
        default: return 'bg-gray-500 text-gray-900';
      }
    };
  
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <div key={application._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <Image 
                  src={`/placeholder.svg?height=40&width=40`} 
                  alt={`${application.jobTitle} logo`} 
                  width={40} 
                  height={40} 
                  className="rounded-full mr-2"
                />
              </div>
              <div className="flex justify-between">
                <Link href={`/my-applications/${application._id}`} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  View Details
                </Link>
                <button 
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(application._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  