import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "ApplySmart",
  description: "Smart job discovery for freshers",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
