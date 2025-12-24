import "./globals.css";

export const metadata = {
  title: "ApplySmart",
  description: "Helping freshers focus on the right jobs — one day at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
