import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Job } from '../../../../../types';



async function getJob(jobId: string): Promise<Job | null> {
  try {
    const res = await fetch(`http://localhost:3001/jobs?id=${jobId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch job");
    const jobs: Job[] = await res.json();
    return jobs[0] || null;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function ApplyJob({
  params,
}: {
  params: { jobId: string };
}) {
  const job = await getJob(params.jobId);

  if (!job) {
    notFound();
  }

  const userDataCookie = (await cookies()).get("user_data");
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;

  async function handleSubmit(formData: FormData) {
    "use server";

    try {
        const res = await fetch("http://localhost:3000/api/application/create", {
            method: "POST",
           
            body: formData,
          });
          


    } catch (error) {
      console.error("Error submitting application:", error);
      throw new Error("There was a mistake");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-8 md:p-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <Link
            href={`/jobs/${job.id}`}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
          >
            &larr; Back to Job Details
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Apply for {job.title} at {job.company}
          </h1>
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={userData?.name || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="hidden"
                id="userId"
                name="userId"
                required
                defaultValue={userData?.id || ""}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                readOnly
                required
                defaultValue={userData?.email || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                required
                readOnly
                defaultValue={job.title}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                required
                accept=".pdf,.doc,.docx"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Letter
              </label>
              <textarea
                id="note"
                name="note"
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
  );
}

