
  import { useState } from 'react'
  
  export default function Settings() {
    const [activeTab, setActiveTab] = useState('general')
    const [settings, setSettings] = useState({
      notifications: true,
      emailUpdates: false,
      darkMode: false,
      twoFactorAuth: true,
      language: 'English',
      timezone: 'UTC',
      theme: 'Default',
      dataSharing: false,
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }))
    }
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white shadow-sm rounded">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {['general', 'account', 'notifications', 'security', 'appearance', 'integrations'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your general preferences.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={settings.language}
                        onChange={handleChange}
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={settings.timezone}
                        onChange={handleChange}
                      >
                        <option>UTC</option>
                        <option>EST</option>
                        <option>PST</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your account information.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Push Notifications</span>
                        <span className="text-sm text-gray-500">Receive push notifications on your devices.</span>
                      </span>
                      <button
                        type="button"
                        className={`${
                          settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        role="switch"
                        aria-checked={settings.notifications}
                        onClick={() => setSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.notifications ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Email Updates</span>
                        <span className="text-sm text-gray-500">Receive email notifications about your account.</span>
                      </span>
                      <button
                        type="button"
                        className={`${
                          settings.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        role="switch"
                        aria-checked={settings.emailUpdates}
                        onClick={() => setSettings(prev => ({ ...prev, emailUpdates: !prev.emailUpdates }))}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.emailUpdates ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your account security preferences.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Two-Factor Authentication</span>
                        <span className="text-sm text-gray-500">Add an extra layer of security to your account.</span>
                      </span>
                      <button
                        type="button"
                        className={`${
                          settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        role="switch"
                        aria-checked={settings.twoFactorAuth}
                        onClick={() => setSettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">Customize the look and feel of your dashboard.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Dark Mode</span>
                        <span className="text-sm text-gray-500">Use dark theme for your dashboard.</span>
                      </span>
                      <button
                        type="button"
                        className={`${
                          settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        role="switch"
                        aria-checked={settings.darkMode}
                        onClick={() => setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                    </div>
                    <div>
                      <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={settings.theme}
                        onChange={handleChange}
                      >
                        <option>Default</option>
                        <option>Modern</option>
                        <option>Classic</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Integrations</h3>
                    <p className="mt-1 text-sm text-gray-500">Connect and manage your integrations.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Google Calendar</span>
                        <span className="text-sm text-gray-500">Sync your events with Google Calendar.</span>
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Connect
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Slack</span>
                        <span className="text-sm text-gray-500">Receive notifications in your Slack workspace.</span>
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }