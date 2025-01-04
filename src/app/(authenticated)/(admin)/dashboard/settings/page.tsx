'use client'

import { useState } from 'react'
import { Bell, Eye, Lock, Globe, Mail, Smartphone } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    dataVisibility: 'department',
    language: 'en',
    twoFactorAuth: false,
  })

  const handleToggle = (setting: string) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">HR Settings</h1>
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <section aria-labelledby="notifications-heading">
            <h2 id="notifications-heading" className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <button
                  id="email-notifications"
                  type="button"
                  className={`${
                    settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role="switch"
                  aria-checked={settings.emailNotifications}
                  onClick={() => handleToggle('emailNotifications')}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <label htmlFor="push-notifications" className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </label>
                </div>
                <button
                  id="push-notifications"
                  type="button"
                  className={`${
                    settings.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role="switch"
                  aria-checked={settings.pushNotifications}
                  onClick={() => handleToggle('pushNotifications')}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>
          </section>
          <hr />
          <section aria-labelledby="data-visibility-heading">
            <h2 id="data-visibility-heading" className="text-xl font-semibold mb-4">Data Visibility</h2>
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-400" />
              <label htmlFor="data-visibility" className="text-sm font-medium text-gray-700">
                Application Data Visibility
              </label>
            </div>
            <select
              id="data-visibility"
              name="dataVisibility"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={settings.dataVisibility}
              onChange={handleSelectChange}
            >
              <option value="department">Department Only</option>
              <option value="hr">All HR</option>
              <option value="management">Management</option>
            </select>
          </section>
          <hr />
          <section aria-labelledby="language-heading">
            <h2 id="language-heading" className="text-xl font-semibold mb-4">Language and Region</h2>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <label htmlFor="language" className="text-sm font-medium text-gray-700">
                Language
              </label>
            </div>
            <select
              id="language"
              name="language"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={settings.language}
              onChange={handleSelectChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </section>
          <hr />
          <section aria-labelledby="security-heading">
            <h2 id="security-heading" className="text-xl font-semibold mb-4">Security</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <label htmlFor="two-factor-auth" className="text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
              </div>
              <button
                id="two-factor-auth"
                type="button"
                className={`${
                  settings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                role="switch"
                aria-checked={settings.twoFactorAuth}
                onClick={() => handleToggle('twoFactorAuth')}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </section>
        </div>
        <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

