"use client";

import { useEffect, useState } from "react";

type Job = {
  title: string;
  company: string;
  location: string;
  why: string;
  apply_url: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jobs/today")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Today’s Focus</h2>
        <p className="text-gray-500 mt-1">
          These roles are a good use of your energy today.
        </p>
      </section>

      {loading && (
        <p className="text-gray-500">Finding the best jobs for you…</p>
      )}

      <div className="space-y-4">
        {!loading &&
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {job.title}
              </h3>

              <p className="text-sm text-gray-500">
                {job.company} · {job.location}
              </p>

              <div className="mt-3 text-sm">
                <span className="font-medium">
                  Why this is worth your time:
                </span>
                <p>{job.why}</p>
              </div>

              <div className="mt-4">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Apply on company site →
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
