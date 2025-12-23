import os
import requests
from dotenv import load_dotenv

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

def discover_jobs(user_profile, limit=10):
    """
    Discover real job openings using search API
    """

    role = user_profile["preferred_role"]
    skills = " ".join(user_profile["skills"])

    query = f"{role} fresher apply site:careers"

    params = {
        "engine": "google",
        "q": query,
        "api_key": SERPAPI_KEY,
        "num": limit
    }

    response = requests.get("https://serpapi.com/search", params=params)
    data = response.json()

    jobs = []

    for result in data.get("organic_results", []):
        jobs.append({
            "title": result.get("title"),
            "company": result.get("source"),
            "location": "On-site / Hybrid",
            "description": result.get("snippet", ""),
            "apply_url": result.get("link"),
            "why": "Discovered from official company career page"
        })

    return jobs
