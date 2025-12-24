import requests

REMOTIVE_API = "https://remotive.com/api/remote-jobs"

def fetch_remote_jobs(user_profile, limit=20):
    response = requests.get(REMOTIVE_API)
    data = response.json()

    jobs = []

    preferred_role = user_profile["preferred_role"].lower()

    for job in data.get("jobs", []):
        title = job.get("title", "").lower()
        description = job.get("description", "").lower()

        # Basic relevance filter
        if preferred_role not in title and preferred_role not in description:
            continue

        jobs.append({
            "title": job.get("title"),
            "company": job.get("company_name"),
            "location": "Remote",
            "description": job.get("description", ""),
            "apply_url": job.get("url"),
            "why": "Remote role matching your preferred profile"
        })

        if len(jobs) >= limit:
            break

    return jobs
