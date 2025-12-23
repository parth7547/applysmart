import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      
      {/* Navigation */}
      <nav className="mb-6 flex gap-6 text-blue-600 font-medium">
        <Link href="/">Today’s Focus</Link>
        <Link href="/outreach">Outreach Draft</Link>
        <Link href="/progress">Progress</Link>
      </nav>

      <h1 className="text-3xl font-bold mb-4">
        Today’s Focus
      </h1>

      <p className="text-gray-600 mb-6">
        These jobs are worth your time today.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">
            Junior Data Analyst
          </h2>
          <p className="text-gray-500">
            Bangalore · Entry Level
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Matches your Python and data analysis skills.
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">
            Machine Learning Intern
          </h2>
          <p className="text-gray-500">
            Remote · Internship
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Strong fit for your ML coursework and projects.
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">
            AI Research Assistant
          </h2>
          <p className="text-gray-500">
            Pune · Contract
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Requires Python and basic NLP knowledge.
          </p>
        </div>
      </div>
    </main>
  );
}
