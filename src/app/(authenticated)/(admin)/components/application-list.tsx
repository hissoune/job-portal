import { ApplicationCard } from './application-card'
import { Application } from '@/types'

// const applications = [
//   {
//     id: 1,
//     name: 'John Doe',
//     position: 'Software Engineer',
//     department: 'Engineering',
//     appliedDate: '2023-06-15',
//     status: 'new',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     position: 'Marketing Manager',
//     department: 'Marketing',
//     appliedDate: '2023-06-14',
//     status: 'reviewing',
//   },
//   {
//     id: 3,
//     name: 'Mike Johnson',
//     position: 'Sales Representative',
//     department: 'Sales',
//     appliedDate: '2023-06-13',
//     status: 'interviewed',
//   },
//   {
//     id: 4,
//     name: 'Emily Brown',
//     position: 'HR Specialist',
//     department: 'HR',
//     appliedDate: '2023-06-12',
//     status: 'offered',
//   },
//   {
//     id: 5,
//     name: 'Chris Wilson',
//     position: 'Financial Analyst',
//     department: 'Finance',
//     appliedDate: '2023-06-11',
//     status: 'hired',
//   },
// ]

interface ApplicationListProps {
    applications: Application[];
    updateStatus: (applicationId: string, status: string) => Promise<{msg:string,application:Application}>;
   
  }

export function ApplicationList({applications,updateStatus}:ApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application._id}  application={application} updateStatus={updateStatus} />
      ))}
    </div>
  )
}

