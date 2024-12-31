import Link from 'next/link';
import { Job } from '../../types';

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {jobs.length > 0 ? (
        jobs.map((job: Job) => (
          <Link href={`/jobs/${job.id}`}
            key={job.id}
            className="bg-gray-200 shadow-lg rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-300"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-indigo-600 transition duration-200">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-4">{job.company}</p>
              <p className="text-gray-500 text-sm mb-4">{job.location}</p>
              <p className="text-gray-700 text-sm flex-grow mb-4">
                {job.description}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Salary: ${job.salary}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                Date: {job.date}
              </p>
              <img src={job.image} alt={job.title} className="w-full h-40 object-cover mb-4" />
              
            </div>
            </Link>
        ))
      ) : (
        <p className="text-gray-500">No jobs found for the selected filters.</p>
      )}
    </div>
  );
}

