export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">
        Outreach Draft
      </h1>

      <p className="text-gray-600 mb-4">
        A draft message you can personalize and send.
      </p>

      <textarea
        className="w-full h-40 p-4 rounded border border-gray-300"
        defaultValue={`Hi,

I came across the opening for a Junior Data Analyst role and felt my skills in Python and data analysis could be a good match.

I would love to connect and learn more about the role.

Thank you,
[Your Name]`}
      />

      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        Copy Message
      </button>
    </main>
  );
}
