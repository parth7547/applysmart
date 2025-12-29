"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <div>
        <h1 className="text-xl font-semibold">ApplySmart</h1>
        <p className="text-sm text-gray-500">Your job search copilot</p>
      </div>

      {status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="text-sm px-4 py-2 rounded bg-slate-900 text-white"
        >
          Login
        </button>
      )}
    </header>
  );
}
