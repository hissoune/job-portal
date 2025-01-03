import { cookies } from "next/headers";
import Link from "next/link";
import {Application} from '@/types'
import { Suspense } from "react";
import ApplicationList from "@/app/components/ApplicationList";
async function getUserApplications(userId: string): Promise<Application[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/application/get?userId=${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch applications");
    return await res.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

async function cancelAplication(AplicationId:string) {
    "use server"
  
    try{
    const res = await fetch(`http://localhost:3000/api/application/cancel?AplicationId=${AplicationId}`, {
        method:"delete",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to deleting applications");
      return await res.json();
    } catch (error) {
      console.error("Error deleting applications:", error);
      return error;
    }
    
}

export default async function ApplicationsPage() {
  const userDataCookie = (await cookies()).get("user_data");
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Job Applications</h1>
      <Suspense fallback={<div>Loading applications...</div>}>
        <ApplicationList cancelAplication={cancelAplication} initialApplications={applications} />
      </Suspense>
    </div>
  );
}
