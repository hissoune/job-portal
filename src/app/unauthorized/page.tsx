import Link from 'next/link'
import { LockIcon, ArrowLeftIcon } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <LockIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! It looks like you don't have the required permissions to view this page.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Unauthorized Access</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Your current role doesn't grant you access to this resource. If you believe this is an error, please contact your administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-center">
            <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

