"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

type Job = {
  title: string;
  company: string;
  location: string;
  job_type: "remote" | "office" | "hybrid";
  why: string;
  apply_url: string;
};

export default function Home() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "remote" | "office">("all");

  // 🔹 Check onboarding profile
  useEffect(() => {
    const stored = localStorage.getItem("applysmart_profile");
    if (!stored) {
      router.push("/onboarding");
      return;
    }
    setProfile(JSON.parse(stored));
  }, [router]);

  // 🔹 Fetch jobs from LIVE backend
  useEffect(() => {
    if (!profile) return;

    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/today`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [profile]);

  // 🔹 Filter logic
  const filteredJobs = jobs.filter((job) => {
    if (filter === "remote") return job.job_type === "remote";
    if (filter === "office") return job.job_type === "office";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* TOP BAR */}
      <section className="px-6 py-6 border-b bg-white">
        <h2 className="text-2xl font-semibold text-gray-900">
          Today’s Focus
        </h2>
        <p className="text-gray-600 mt-1">
          Opportunities matched to your preferences.
        </p>

        <div className="flex gap-3 mt-4">
          {["all", "remote", "office"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  filter === f
                    ? "bg-slate-900 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              {f === "all"
                ? "Best matches"
                : f === "remote"
                ? "Remote"
                : "In-office"}
            </button>
          ))}
        </div>
      </section>

      {/* JOB GRID */}
      <main className="p-6">
        {loading && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {job.company} · {job.location}
                </p>

                <div className="mt-4 bg-slate-50 border-l-4 border-slate-900 p-3 text-sm text-slate-700">
                  <span className="font-medium block mb-1">
                    Why this role
                  </span>
                  {job.why}
                </div>

                <div className="mt-6">
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-800 transition"
                  >
                    Apply →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <p className="text-gray-500 mt-10">
            No jobs match this filter right now.
          </p>
        )}
      </main>
    </div>
  );
}
