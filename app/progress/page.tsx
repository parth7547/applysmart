export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Your Progress
      </h1>

      <ul className="mb-6 text-gray-700 list-disc pl-6">
        <li>Jobs reviewed today: 3</li>
        <li>Outreach messages prepared: 1</li>
        <li>Applications tracked: 1</li>
      </ul>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg font-medium">
          Don’t worry. Things take time.
        </p>
        <p className="text-gray-600 mt-2">
          What comes later often comes better.  
          You’re still moving forward.
        </p>
      </div>
    </main>
  );
}
