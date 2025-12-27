import os
import requests
from dotenv import load_dotenv

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")


# -----------------------------
# Job type detection (SAFE)
# -----------------------------
def detect_job_type(title, snippet, link):
    text = f"{title} {snippet} {link}".lower()

    if any(word in text for word in [
        "remote", "work from home", "wfh", "anywhere",
        "worldwide", "distributed", "home-based"
    ]):
        return "remote"

    if "hybrid" in text:
        return "hybrid"

    return "office"



# -----------------------------
# Build smart search queries
# -----------------------------
def build_queries(user_profile):
    role = user_profile["preferred_role"]

    return {
        "office": [
            f"{role} intern apply site:careers",
            f"junior {role} apply site:careers",
            f"{role} fresher apply site:company",
        ],
        "remote": [
            f"remote {role} intern apply",
            f"{role} remote job apply",
            f"{role} work from home apply",
        ]
    }

# -----------------------------
# Discover real job openings
# -----------------------------
def discover_jobs(user_profile, limit=20):
    query_groups = build_queries(user_profile)
    jobs = []
    seen_links = set()

    # total number of queries (office + remote)
    total_queries = sum(len(q) for q in query_groups.values())
    results_per_query = max(1, limit // total_queries)

    for job_mode, queries in query_groups.items():
        for query in queries:
            params = {
                "engine": "google",
                "q": query,
                "api_key": SERPAPI_KEY,
                "num": results_per_query,
                "hl": "en",
                "gl": "in"
            }

            response = requests.get("https://serpapi.com/search", params=params)
            data = response.json()

            for result in data.get("organic_results", []):
                title_raw = result.get("title") or ""
                snippet_raw = result.get("snippet") or ""
                apply_url = result.get("link") or ""

                # Skip job aggregators explicitly
                if any(site in apply_url for site in [
                    "naukri", "linkedin.com/jobs", "internshala", "indeed"
                ]):
                    continue

                if not apply_url or apply_url in seen_links:
                    continue

                seen_links.add(apply_url)

                job_type = "remote" if job_mode == "remote" else "office"
                location = "Remote" if job_type == "remote" else "On-site / Hybrid"

                jobs.append({
                    "title": title_raw,
                    "company": result.get("source") or "Unknown",
                    "location": location,
                    "job_type": job_type,
                    "why": f"Discovered via {job_type} job search",
                    "apply_url": apply_url,
                })

                if len(jobs) >= limit:
                    return jobs

    return jobs
