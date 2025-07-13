import { Scroll, CheckCircle } from 'lucide-react'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded shadow border overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-indigo-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center">
              <Scroll className="h-6 w-6 mr-2" />
              Terms and Conditions
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-indigo-200">Last updated: July 1, 2023</p>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="prose prose-indigo max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this project management platform, you agree to be bound by these Terms and
              Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with
              any applicable local laws.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use this platform for personal or business project management
              purposes only. This is the grant of a license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on the platform;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on this platform are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall our company or our suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on our platform, even if we or an authorized representative has been notified orally
              or in writing of the possibility of such damage.
            </p>

            <h2>5. Revisions and Errata</h2>
            <p>
              The materials appearing on our platform could include technical, typographical, or photographic errors.
              We do not warrant that any of the materials on our platform are accurate, complete or current. We may make
              changes to the materials contained on our platform at any time without notice.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and
              you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">By using our platform, you agree to these terms.</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <CheckCircle className="h-5 w-5 mr-2" />
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}