export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Poppins',sans-serif]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#333333]">SkillShare Hub</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-[#6C757D] hover:text-[#6C63FF]">Home</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-[#6C63FF]">Courses</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-[#6C63FF]">Tutors</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-[#6C63FF]">About</a></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-[#6C63FF] border-2 border-[#6C63FF] rounded-md hover:bg-[#6C63FF] hover:text-white transition duration-300">
              Log In
            </button>
            <button className="px-4 py-2 bg-[#6C63FF] text-white rounded-md hover:bg-[#5A52D5] transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="w-1/2 pr-8">
            <h2 className="text-5xl font-bold mb-6">Unlock Your Potential with SkillShare Hub</h2>
            <p className="text-xl mb-8">Discover, learn, and master new skills from expert tutors around the world.</p>
            <button className="px-8 py-3 bg-[#FFC75F] text-[#333333] rounded-md hover:bg-opacity-90 transition duration-300 font-semibold">
              Start Learning Now
            </button>
          </div>
          <div className="w-1/2">
            <img src="/placeholder.svg" alt="Learning Illustration" width={600} height={400} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#333333]">Why Choose SkillShare Hub?</h3>
          <div className="grid grid-cols-3 gap-8">
            {[
              { title: "Expert Tutors", icon: "👨‍🏫", description: "Learn from industry professionals and experienced educators." },
              { title: "Flexible Learning", icon: "🕰️", description: "Study at your own pace with on-demand video lessons." },
              { title: "Wide Range of Courses", icon: "📚", description: "Explore diverse subjects from coding to creative arts." },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-[#333333]">{feature.title}</h4>
                <p className="text-[#6C757D]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#333333]">Explore Our Categories</h3>
          <div className="grid grid-cols-4 gap-6">
            {[
              "Web Development", "Data Science", "Digital Marketing", "Graphic Design",
              "Language Learning", "Music", "Photography", "Business"
            ].map((category, index) => (
              <div key={index} className="bg-[#F8F9FA] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <img src="/placeholder.svg" alt={category} width={80} height={80} className="mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-[#333333]">{category}</h4>
                <p className="text-[#6C757D] text-sm">Explore courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#6C63FF] text-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">What Our Students Say</h3>
          <div className="grid grid-cols-3 gap-8">
            {[
              { name: "Sarah L.", quote: "SkillShare Hub transformed my career. The courses are top-notch and the tutors are amazing!" },
              { name: "Mike R.", quote: "I've learned more in a month on SkillShare Hub than I did in a year at college. Highly recommended!" },
              { name: "Emily T.", quote: "The flexibility of SkillShare Hub allowed me to upskill while working full-time. It's been invaluable." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-xl">
                <p className="mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6C63FF] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">SkillShare Hub</h5>
            <p className="text-sm">Empowering learners worldwide through accessible, high-quality online education.</p>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Tutors</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Legal</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-4">Connect With Us</h6>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FFC75F]">Facebook</a>
              <a href="#" className="hover:text-[#FFC75F]">Twitter</a>
              <a href="#" className="hover:text-[#FFC75F]">LinkedIn</a>
              <a href="#" className="hover:text-[#FFC75F]">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}