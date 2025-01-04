import { Overview } from "../components/overview"
import { RecentApplicants } from "../components/recent-applicants"
import { ApplicationsChart } from "../components/applications-chart"
import { HiringAdvice } from "../components/hiring-advice"

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-8 p-8">
      <h1 className="text-3xl font-bold">HR Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Applicants</h3>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-xs text-gray-500">+20.1% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Open Positions</h3>
          <p className="text-2xl font-bold">23</p>
          <p className="text-xs text-gray-500">+2 new this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Interviews Scheduled</h3>
          <p className="text-2xl font-bold">45</p>
          <p className="text-xs text-gray-500">For the next 7 days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Time to Hire (Avg)</h3>
          <p className="text-2xl font-bold">18 days</p>
          <p className="text-xs text-gray-500">-2 days from last quarter</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600" aria-current="page">
              Overview
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Analytics
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Reports
            </button>
          </nav>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <h3 className="text-lg font-semibold mb-4">Applications Overview</h3>
              <Overview />
            </div>
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-4">Recent Applicants</h3>
              <RecentApplicants />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Applications by Department</h3>
        <ApplicationsChart />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Hiring Manager Advice</h3>
        <HiringAdvice />
      </div>
    </div>
  )
}
