"use client";

import React, { useState } from "react";
import { Application } from "@/types";

interface ApplicationCardProps {
  application: Application;
  updateStatus: (applicationId: string, status: string) => Promise<{msg:string,application:Application}>;
}

export function ApplicationCard({ application, updateStatus }: ApplicationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(application.status);
  const [currentStatus, setCurrentStatus] = useState(application.status); 

  const statuses = ["new", "reviewing", "interviewed", "offered", "hired", "rejected"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "interviewed":
        return "bg-purple-100 text-purple-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "hired":
        return "bg-indigo-100 text-indigo-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdateStatus = async () => {
    const res = await updateStatus(application._id, selectedStatus);

    if (res && res.application) {
      setCurrentStatus(selectedStatus);
      setIsModalOpen(false);
    } else {
      console.error("Failed to update application status");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
            <p className="text-gray-600">{application.created_at}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(currentStatus)}`}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </span>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Department: sss</span>
          <span>Applied: {new Date(application.created_at).toLocaleDateString()}</span>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Details
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Update Status
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={() => setSelectedStatus(status)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-800">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
