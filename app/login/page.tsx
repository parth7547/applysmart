"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-2 text-center text-gray-900">
          Welcome to ApplySmart
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sign in to get your focused job list
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
