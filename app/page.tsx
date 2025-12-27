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

  /* -------------------------------
     1. Redirect to onboarding if needed
  -------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem("applysmart_profile");
    if (!stored) {
      router.push("/onboarding");
      return;
    }
    setProfile(JSON.parse(stored));
  }, [router]);

  /* -------------------------------
     2. Fetch jobs using profile
  -------------------------------- */
  useEffect(() => {
    if (!profile) return;

    setLoading(true);

    fetch("http://127.0.0.1:8000/jobs/today", {
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

  /* -------------------------------
     3. Filter jobs
  -------------------------------- */
  const filteredJobs = jobs.filter((job) => {
    if (filter === "remote") return job.job_type === "remote";
    if (filter === "office") return job.job_type === "office";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* TOP CONTROLS */}
      <section className="px-6 py-6 border-b bg-white">
        <h2 className="text-2xl font-semibold text-gray-900">
          Today’s Focus
        </h2>
        <p className="text-gray-600 mt-1">
          Opportunities matched to your preferences. Focus on quality.
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

      {/* MAIN CONTENT */}
      <main className="p-6">
        {loading && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(320px,1fr))] auto-rows-fr">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(360px,1fr))] auto-rows-fr">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border transition
                  hover:shadow-xl hover:-translate-y-1 hover:ring-1 hover:ring-slate-300
                  ${
                    index === 0 && filter === "all"
                      ? "border-slate-900"
                      : "border-gray-200"
                  }`}
              >
                {index === 0 && filter === "all" && (
                  <span className="inline-block mb-2 text-xs font-medium bg-slate-100 text-slate-900 px-2 py-1 rounded">
                    ⭐ Top match
                  </span>
                )}

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

                <div className="mt-6 flex justify-between items-center">
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-800 transition"
                  >
                    Apply →
                  </a>
                  <span className="text-xs text-gray-400">
                    Opens new tab
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="mt-10 max-w-xl text-gray-600">
            {filter === "remote" ? (
              <>
                <p className="font-medium">
                  Remote roles are limited for entry-level positions.
                </p>
                <p className="text-sm mt-1">
                  Most fresher and internship roles currently prefer on-site or
                  hybrid work.
                </p>
              </>
            ) : (
              <p>No jobs match this filter right now.</p>
            )}
          </div>
        )}

        {/* FOOTER CLOSURE */}
        <div className="mt-16 pb-12 flex flex-col items-center text-center text-gray-500">
          <div className="w-full max-w-xl border-t pt-6">
            <p className="text-sm">
              That’s your focused job list for today.
            </p>
            <p className="text-xs mt-1">
              Come back tomorrow — consistency beats mass applying.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
