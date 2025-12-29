"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const { status } = useSession();
  const router = useRouter();

  const [role, setRole] = useState("");
  const [location, setLocation] = useState("any");
  const [experience, setExperience] = useState("fresher");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  const handleContinue = () => {
    if (!role.trim()) {
      alert("Please enter a preferred role");
      return;
    }

    localStorage.setItem(
      "applysmart_profile",
      JSON.stringify({
        preferred_role: role,
        location_preference: location,
        experience_level: experience,
      })
    );

    // ✅ IMPORTANT
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Set up your job preferences
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          This helps us find the right jobs for you.
        </p>

        <label className="block mb-4 text-sm text-gray-700">
          Preferred role
          <input
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="e.g. Data Analyst"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>

        <label className="block mb-4 text-sm text-gray-700">
          Location preference
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="remote">Remote</option>
            <option value="office">In-office</option>
          </select>
        </label>

        <label className="block mb-6 text-sm text-gray-700">
          Experience level
          <select
            className="w-full mt-1 p-2 border rounded-md"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="fresher">Fresher</option>
            <option value="0-1">0–1 years</option>
          </select>
        </label>

        <button
          onClick={handleContinue}
          className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
