import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Job {
  id: string
  title: string
  company: string
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

export default async function ApplyJob({ params }: { params: { jobId: string } }) {
  const job = await getJob(params.jobId)

  if (!job) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'
   
    console.log('Form submitted:', Object.fromEntries(formData))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-8 md:p-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <Link href={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            &larr; Back to Job Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Apply for {job.title} at {job.company}</h1>
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume URL</label>
              <input
                type="url"
                id="resume"
                name="resume"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/your-resume.pdf"
              />
            </div>
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

