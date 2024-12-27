
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen p-8 sm:p-20">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-teal-400 drop-shadow-lg">
          Welcome to Jobify
        </h1>
        <p className="text-lg text-gray-300">
          Your gateway to exploring professional job opportunities and managing your applications seamlessly.
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 gap-16 mt-16">
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-teal-300">About the Project</h2>
          <p className="text-gray-300 leading-relaxed">
            Jobify is designed to connect job seekers with employers in the most efficient way possible. Our platform allows users to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>Browse job opportunities from top companies.</li>
            <li>Filter and search for jobs by title, location, and contract type.</li>
            <li>Track and manage your applications with ease.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-teal-300">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>User-friendly interface for job exploration.</li>
            <li>Real-time application tracking.</li>
            <li>Secure authentication and data management.</li>
            <li>Admin tools for managing job postings and applications.</li>
          </ul>
          <Image
            src="https://i.pinimg.com/236x/79/49/e4/7949e4a1679a715dde1150bf0c2f6987.jpg"
            alt="Jobify Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </section>
      </main>

      <footer className="mt-16 border-t border-gray-700 pt-8">
        <h3 className="text-2xl font-semibold text-center text-teal-300">Contact Us</h3>
        <p className="text-center text-gray-400 mt-2">
          Have any questions or suggestions? Feel free to reach out to us!
        </p>

        <form className="max-w-xl mx-auto mt-6 space-y-4">
          <div>
            <label className="block text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center">
          <h4 className="text-xl font-semibold text-gray-300">Follow Us</h4>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-500 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-500 transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-500 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
