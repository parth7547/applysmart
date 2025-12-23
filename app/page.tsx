import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">


      
      {/* Navigation */}
      <nav className="mb-6 flex gap-6 text-blue-600 font-medium">
        <Link href="/">Today’s Focus</Link>
        <Link href="/outreach">Outreach Draft</Link>
        <Link href="/progress">Progress</Link>
      </nav>

            <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Today’s Focus
        </h2>
        <p className="text-gray-500 mt-1">
          These roles are a good use of your energy today.
        </p>
      </section>

           <div className="space-y-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">
            Junior Data Analyst
          </h3>
          <p className="text-sm text-gray-500">
            Bangalore · Entry Level
          </p>

          <div className="mt-3 text-sm text-gray-700">
            <span className="font-medium text-gray-800">
              Why this is worth your time:
            </span>
            <p>
              Matches your Python and data analysis skills. Requires 0–1 years
              experience.
            </p>
          </div>
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

 
