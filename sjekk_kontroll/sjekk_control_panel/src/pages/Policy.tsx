import { Shield, Lock, Eye, Users, FileText, AlertTriangle } from 'lucide-react'

export default function Policy() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded border">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Last updated: July 1, 2023</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="prose prose-sm text-gray-500 max-w-none">
              <p>
                Your privacy is important to us. It is our policy to respect your privacy regarding any information we
                may collect from you across our website and other sites we own and operate.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-indigo-500 mr-2" />
                Information We Collect
              </h2>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by
                fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and
                how it will be used.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-indigo-500 mr-2" />
                Data Protection
              </h2>
              <p>
                We only retain collected information for as long as necessary to provide you with your requested
                service. What data we store, we'll protect within commercially acceptable means to prevent loss and
                theft, as well as unauthorized access, disclosure, copying, use or modification.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-indigo-500 mr-2" />
                Cookies and Tracking
              </h2>
              <p>
                We use cookies to store information about your preferences and history, as well as to customize your
                experience on our website. You can choose to disable cookies through your individual browser options.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <Users className="h-6 w-6 text-indigo-500 mr-2" />
                Third-Party Services
              </h2>
              <p>
                We may employ third-party companies and individuals due to the following reasons: to facilitate our
                service; to provide the service on our behalf; to perform service-related services; or to assist us in
                analyzing how our service is used. These third parties have access to your Personal Information only to
                perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <FileText className="h-6 w-6 text-indigo-500 mr-2" />
                Changes to This Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-indigo-500 mr-2" />
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@example.com or through
                the contact form on our website.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded border">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Accept Privacy Policy</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>To continue using our services, you must accept our Privacy Policy.</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Accept Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}