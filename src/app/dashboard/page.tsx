import Link from 'next/link';
import JobFilter from '../components/JobFilter';
import JobList from '../components/JobList';
import Pagination from '../components/Pagination';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
  date: string;
  imageUrl: string; 
}

interface DashboardProps {
  searchParams: {
    search?: string;
    location?: string;
    salary?: string;
    date?: string;
    page?: string;
  };
}

async function fetchJobs(
  searchQuery: string,
  location: string,
  salary: string,
  date: string,
  page: number
): Promise<{ jobs: Job[], totalJobs: number }> {
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const jobsResponse = await fetch("http://localhost:3001/jobs");
  const jobsData: Job[] = await jobsResponse.json();

  const filteredJobs = jobsData.filter((job) => {
    let valid = true;

    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      valid = false;
    }
    if (location && job.location.toLowerCase() !== location.toLowerCase()) {
      valid = false;
    }
    if (salary && job.salary < parseInt(salary)) {
      valid = false;
    }
    if (date) {
      const jobDate = new Date(job.date);
      const filterDate = new Date(date);
      if (jobDate < filterDate) {
        valid = false;
      }
    }

    return valid;
  });

  const totalJobs = filteredJobs.length;
  const paginatedJobs = filteredJobs.slice(offset, offset + pageSize);

  return { jobs: paginatedJobs, totalJobs };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const page = parseInt(searchParams.page || '1');
  const { jobs, totalJobs } = await fetchJobs(
    searchParams?.search || '',
    searchParams?.location || '',
    searchParams?.salary || '',
    searchParams?.date || '',
    page
  );

  const totalPages = Math.ceil(totalJobs / 10);

  const paginationParams = {
    currentPage: page,
    totalPages,
    search: searchParams.search || '',
    location: searchParams.location || '',
    salary: searchParams.salary || '',
    date: searchParams.date || '',
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-20 flex">
      <aside className="w-1/4 bg-white shadow-xl rounded-lg p-6 mr-8 h-fit">
        <JobFilter initialValues={searchParams} />
      </aside>

      <main className="w-3/4">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Job Openings
          </h1>

          <JobList jobs={jobs} />

          <Pagination {...paginationParams} />
        </div>
      </main>
    </div>
  );
}

