// src/app/dashboard/page.tsx

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
  date: string;
  imageUrl: string; // Add an imageUrl field to display an image
} // Define your Job interface

interface DashboardProps {
  searchQuery: string;
  category: string;
  location: string;
  salary: string;
  date: string;
  page: number;
}

async function fetchJobs(
  searchQuery: string,
  location: string,
  salary: string,
  date: string,
  page: number
) {
  const jobsResponse = await fetch("http://localhost:3001/jobs");
  const jobsData: Job[] = await jobsResponse.json();

  const filteredJobs = jobsData.filter((job) => {
    let valid = true;

    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      valid = false;
    }
   
    if (location && job.location !== location) {
      valid = false;
    }
    if (salary && job.salary !== parseInt(salary)) {
      valid = false;
    }
    if (date && job.date !== date) {
      valid = false;
    }

    return valid;
  });

  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(offset, offset + pageSize);

  return jobsData;
}

const Dashboard = async ({ searchQuery, category, location, salary, date, page }: DashboardProps) => {
  const jobs = await fetchJobs(searchQuery, location, salary, date, page);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-20 flex">
      <aside className="w-1/4 bg-white shadow-xl rounded-lg p-6 mr-8 h-screen">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Filter Jobs</h2>
        <form method="GET" action="/dashboard">
          <div className="mb-4">
            <label htmlFor="search" className="block text-gray-600 mb-2">Search</label>
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search by job title..."
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
      </aside>

      <main className="w-3/4">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Job Openings
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? (
              jobs.map((job: Job) => (
                <div
                  key={job.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-300"
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
                    <img src={job.imageUrl} alt={job.title} className="w-full h-40 object-cover mb-4" />
                    <a
                      href="#"
                      className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-full text-center hover:bg-indigo-600 transition duration-200 transform hover:scale-105"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs found for the selected filters.</p>
            )}
          </div>

          <div className="text-center mt-6">
            <a
              href={`/dashboard?page=${page + 1}&search=${searchQuery}&category=${category}&location=${location}&salary=${salary || ""}&date=${date}`}
              className="bg-indigo-500 text-white px-6 py-3 rounded-full text-center hover:bg-indigo-600 transition duration-200 transform hover:scale-105"
            >
              Load More
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
