export default function Header() {
  return (
    <header className="w-full bg-white border-b">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">
            ApplySmart
          </h1>
          <p className="text-sm text-gray-500">
            Your job search copilot
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-sm text-gray-500">
          Not signed in
        </div>
      </div>
    </header>
  );
}
