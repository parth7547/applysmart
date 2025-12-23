import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-3xl mx-auto p-6">

          {/* App Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold">ApplySmart</h1>
            <p className="text-gray-600 mt-1">
              Helping freshers focus on the right jobs — one day at a time.
            </p>

            {/* Navigation */}
            <nav className="mt-4 flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-black">Today</Link>
              <Link href="/outreach" className="hover:text-black">Outreach</Link>
              <Link href="/progress" className="hover:text-black">Progress</Link>
            </nav>
          </header>

          {/* Page Content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="mt-16 text-sm text-gray-500">
            Don’t worry. Things take time. What comes later often comes better.
          </footer>

        </div>
      </body>
    </html>
  );
}
