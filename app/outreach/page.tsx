"use client";

export default function OutreachPage() {
  return (
    <>
      {/* Page Header */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">
          Outreach Draft
        </h2>
        <p className="text-gray-500 mt-1">
          Use this as a starting point. You can edit it to sound like you.
        </p>
      </section>

      {/* Guidance Box */}
      <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-900">
        <p className="font-medium mb-1">
          Tip for freshers:
        </p>
        <p>
          Keep it short, polite, and specific. You’re not asking for a job —
          you’re starting a conversation.
        </p>
      </div>

      {/* Draft Message */}
      <div className="bg-white border rounded-lg p-5 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Suggested message
        </label>

        <textarea
          className="w-full h-44 p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          defaultValue={`Hi [Name],

I came across the opening for the Junior Data Analyst role and felt that my background in Python and data analysis aligns well with the requirements.

I would really appreciate the opportunity to connect and learn more about the role and your team.

Thank you for your time,
[Your Name]`}
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800"
            onClick={() => {
              navigator.clipboard.writeText(
                `Hi [Name],

I came across the opening for the Junior Data Analyst role and felt that my background in Python and data analysis aligns well with the requirements.

I would really appreciate the opportunity to connect and learn more about the role and your team.

Thank you for your time,
[Your Name]`
              );
            }}
          >
            Copy message
          </button>
        </div>
      </div>
    </>
  );
}
