import os
import requests
from dotenv import load_dotenv

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")


def build_queries(user_profile):
    role = user_profile["preferred_role"]

    queries = [
        f"{role} intern apply",
        f"junior {role} apply",
        f"{role} fresher 0-1 years apply",
        f"{role} trainee apply",
    ]

    return queries


def discover_jobs(user_profile, limit=20):
    """
    Discover real job openings using search API
    """

    queries = build_queries(user_profile)
    jobs = []

    ROLE_KEYWORDS = [
        "intern", "junior", "associate", "analyst",
        "trainee", "engineer", "developer", "scientist"
    ]

    GENERIC_TITLES = [
        "careers", "join our team", "current openings",
        "jobs at", "work with us"
    ]

    results_per_query = max(1, limit // len(queries))

    for query in queries:
        params = {
            "engine": "google",
            "q": query,
            "api_key": SERPAPI_KEY,
            "num": results_per_query
        }

        response = requests.get("https://serpapi.com/search", params=params)
        data = response.json()

        for result in data.get("organic_results", []):
            title = (result.get("title") or "").lower()
            snippet = (result.get("snippet") or "").lower()

            # Skip generic career pages
            if any(generic in title for generic in GENERIC_TITLES):
                continue

            # Keep only role-specific pages
            if not any(keyword in title or keyword in snippet for keyword in ROLE_KEYWORDS):
                continue

            jobs.append({
                "title": result.get("title"),
                "company": result.get("source"),
                "location": "On-site / Hybrid",
                "description": result.get("snippet", ""),
                "apply_url": result.get("link"),
                "why": f"Matches search query: '{query}'"
            })

    return jobs
