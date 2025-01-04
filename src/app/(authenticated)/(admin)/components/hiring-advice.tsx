import { CheckCircle } from 'lucide-react'

const adviceList = [
  "Review resumes thoroughly and look for relevant experience and skills.",
  "Prepare structured interview questions to assess candidates consistently.",
  "Consider using skills assessments or job-specific tests when appropriate.",
  "Check references and verify employment history before making offers.",
  "Provide timely feedback to candidates throughout the hiring process.",
]

export function HiringAdvice() {
  return (
    <ul className="space-y-4">
      {adviceList.map((advice, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span>{advice}</span>
        </li>
      ))}
    </ul>
  )
}

