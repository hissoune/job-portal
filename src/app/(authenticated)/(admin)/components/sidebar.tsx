import Link from 'next/link'
import { Home, Users, FileText, Settings } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Applicants', href: '/admin/applicants', icon: Users },
  { name: 'Jobs', href: '/admin/jobs', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold">HR Portal</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

