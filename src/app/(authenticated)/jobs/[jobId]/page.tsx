import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  salary: number
  date: string
  image: string
}

async function getJob(jobId: string): Promise<Job | null> {
  try {
    const res = await fetch(`http://localhost:3001/jobs?id=${jobId}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch job')
    const jobs: Job[] = await res.json()
    return jobs[0] || null
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export default async function JobDetails({ params }: { params: { jobId: string } }) {
  const job = await getJob(params.jobId)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-8 md:p-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            &larr; Back to Job Listings
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center">
              <Image 
                src={job.image} 
                alt={job.company} 
                width={64} 
                height={64} 
                className="rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                <p className="text-xl text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-700"><strong>Salary:</strong> ${job.salary.toLocaleString()}</p>
              <p className="text-gray-700"><strong>Posted on:</strong> {new Date(job.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="mb-6">
            <Image 
              src={job.image} 
              alt={`${job.company} office or related image`} 
              width={800} 
              height={400} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="text-center">
            <Link href={`/jobs/${job.id}/apply`} className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Apply for this Position
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

