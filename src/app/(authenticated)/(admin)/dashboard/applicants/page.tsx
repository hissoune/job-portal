import { ApplicationList } from '../../components/application-list'
import { ApplicationFilters } from '../../components/application-filters'
import { Application } from '@/types'


async function getApplications(): Promise<Application[]>{
  'use server'
  try {
    const res = await fetch(`http://localhost:3000/api/application/allAplications`, {
      cache: "no-store",
      method:"GET"
    });

    if (!res.ok) throw new Error("Failed to fetch applications");

    return await res.json();

  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }

}
export default async function ApplicationsPage() {

    const applications = await getApplications();
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <ApplicationFilters />
        </div>
        <div className="w-full md:w-3/4">
          <ApplicationList applications={applications} />
        </div>
      </div>
    </div>
  )
}

