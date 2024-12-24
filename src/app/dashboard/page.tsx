"use client";

import { useAuth } from "@/app/lib/Protected";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your account!</p>
    </div>
  );
}
