import fs from 'fs';
import { request } from 'http';
import path from 'path';

async function getJobs() {
  const filePath = path.join(process.cwd(), 'src/app/lib', 'jobs.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}
console.log(request?.user);

export default async function Dashboard() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Jobs</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to your account! Here are the latest job openings:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{job.title}</h2>
                <p className="text-gray-600 mb-3">{job.company}</p>
                <img src="https://i.pinimg.com/474x/d4/e4/61/d4e461e60c11f1bc83c9f2d8810a5878.jpg" alt="ju" />
                <p className="text-gray-500 text-sm mb-3">{job.location}</p>
                <p className="text-gray-700 text-sm mb-4">{job.description}</p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-center hover:bg-blue-600 transition duration-200"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
