import { cookies } from "next/headers";
import Link from "next/link";
import { Application } from "../../types";

async function getUserApplications(userId: string): Promise<Application[]> {
  try {
    const res = await fetch(`http://localhost:3001/applications?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch applications");
    return await res.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export default async function ApplicationsPage() {
  const userDataCookie = cookies().get("user_data");
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">You need to log in to view your applications.</p>
      </div>
    );
  }

  const applications = await getUserApplications(userData.id);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Your Applications</h1>
        {applications.length > 0 ? (
          <ul className="space-y-4">
            {applications.map((app) => (
              <li
                key={app.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
              >
                <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
                <p>Company: {app.company}</p>
                <p>Status: {app.status || "Pending"}</p>
                <Link
                  href={`/applications/${app.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not submitted any applications yet.</p>
        )}
      </div>
    </div>
  );
}
