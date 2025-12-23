export default function ProgressPage() {
  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">
          Your Progress
        </h2>
        <p className="text-gray-500 mt-1">
          Progress isn’t only about replies. Effort matters too.
        </p>
      </section>

      {/* Validation Card */}
      <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-lg text-sm text-green-900">
        <p className="font-medium">
          You showed up today.
        </p>
        <p className="mt-1">
          Even when results are quiet, consistency builds momentum.
        </p>
      </div>

      {/* Effort Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold">3</p>
          <p className="text-sm text-gray-500 mt-1">
            Jobs reviewed
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold">1</p>
          <p className="text-sm text-gray-500 mt-1">
            Messages prepared
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold">1</p>
          <p className="text-sm text-gray-500 mt-1">
            Applications tracked
          </p>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="bg-white border rounded-lg p-5 shadow-sm">
        <p className="text-gray-800 font-medium">
          Keep going.
        </p>
        <p className="text-gray-600 mt-2 text-sm">
          Many good things arrive late — but they arrive because you stayed
          consistent. Today counted.
        </p>
      </div>
    </>
  );
}
