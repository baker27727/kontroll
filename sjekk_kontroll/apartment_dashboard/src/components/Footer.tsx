
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-4">
  <div className="max-w-8xl mx-auto  px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between p-4">
      {/* Company Info */}
      <div>
        <h4 className="text-lg font-semibold mb-2">About Parksync</h4>
        <p className="text-sm text-gray-400">
          Parksync offers innovative solutions to simplify your parking experience.
        </p>
      </div>
      
      
      {/* Contact & Social Media */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Connect with Us</h4>
        <p className="text-sm text-gray-400 mb-2">
          <a href="mailto:info@parksync.com" className="hover:underline">info@parksync.com</a>
        </p>
      </div>
    </div>
    <div className="mt-2 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 py-4">
      © 2024 Parksync. All rights reserved.
    </div>
  </div>
</footer>
  )
}

export default Footer