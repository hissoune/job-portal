import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search: string;
  location: string;
  salary: string;
  date: string;
}

export default function Pagination({ currentPage, totalPages, search, location, salary, date }: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (salary) params.set('salary', salary);
    if (date) params.set('date', date);
    params.set('page', page.toString());
    return `/dashboard?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)} className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-200">
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)} className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-200">
          Next
        </Link>
      )}
    </div>
  );
}

