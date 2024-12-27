import fs from "fs";
import path from "path";

async function getJobs(page: number, limit: number, searchQuery: string) {
  const filePath = path.join(process.cwd(), "src/app/lib", "jobs.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const allJobs = JSON.parse(jsonData);


  const filteredJobs = allJobs.filter((job: any) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = (page - 1) * limit;
  return filteredJobs.slice(offset, offset + limit);
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams?.page || "1");
  const searchQuery = searchParams?.search || "";

  // Fetch jobs data (SSR happens here!)
  const jobs = await getJobs(page, 5, searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-20">
      <div className="mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Job Openings
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Welcome to your account! Here are the latest job opportunities:
        </p>

        <div className="mb-6">
          {/* Search functionality */}
          <form
            method="GET"
            action="/dashboard"
            className="w-full flex flex-col items-center"
          >
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search by job title..."
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition duration-200"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((job: any) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-300"
              >
                <div className="p-6 flex flex-col justify-between h-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-indigo-600 transition duration-200">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{job.company}</p>
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src="https://i.pinimg.com/474x/d4/e4/61/d4e461e60c11f1bc83c9f2d8810a5878.jpg"
                      alt="job"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{job.location}</p>
                  <p className="text-gray-700 text-sm flex-grow mb-4">
                    {job.description}
                  </p>
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
            <p className="text-gray-500">No jobs found for the search query.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="text-center mt-6">
          <a
            href={`/dashboard?page=${page + 1}&search=${searchQuery}`}
            className="bg-indigo-500 text-white px-6 py-3 rounded-full text-center hover:bg-indigo-600 transition duration-200 transform hover:scale-105"
          >
            Load More
          </a>
        </div>
      </div>
    </div>
  );
}
