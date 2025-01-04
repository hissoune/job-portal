import { Application } from '@/types'

  
  interface ApplicationCardProps {
    application: Application
  }
  
  export function ApplicationCard({ application }: ApplicationCardProps) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'new': return 'bg-blue-100 text-blue-800'
        case 'reviewing': return 'bg-yellow-100 text-yellow-800'
        case 'interviewed': return 'bg-purple-100 text-purple-800'
        case 'offered': return 'bg-green-100 text-green-800'
        case 'hired': return 'bg-indigo-100 text-indigo-800'
        case 'rejected': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
            <p className="text-gray-600">{application.created_at}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
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
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Update Status
          </button>
        </div>
      </div>
    )
  }
  
  