import { Avatar } from './avatar'

const recentApplicants = [
  { name: "Olivia Johnson", role: "Software Engineer", department: "Engineering" },
  { name: "Ethan Williams", role: "Product Manager", department: "Product" },
  { name: "Sophia Brown", role: "UX Designer", department: "Design" },
  { name: "Liam Davis", role: "Data Analyst", department: "Analytics" },
  { name: "Ava Wilson", role: "Marketing Specialist", department: "Marketing" },
]

export function RecentApplicants() {
  return (
    <div className="space-y-4">
      {recentApplicants.map((applicant) => (
        <div key={applicant.name} className="flex items-center">
          <Avatar
            name={applicant.name}
            imageUrl={`https://i.pravatar.cc/150?u=${applicant.name.replace(' ', '')}`}
            size={36}
          />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{applicant.name}</p>
            <p className="text-sm text-gray-500">
              {applicant.role} - {applicant.department}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

