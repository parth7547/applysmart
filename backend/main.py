from agent.search_discovery import discover_jobs
from agent.remote_fetcher import fetch_remote_jobs
from agent.job_selector import select_top_jobs
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import time

CACHE = {
    "data": None,
    "timestamp": 0
}

CACHE_TTL = 1800  # 30 minutes


app = FastAPI(title="ApplySmart Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ApplySmart backend running"}

@app.get("/jobs/today")
def get_todays_jobs():
    current_time = time.time()

    if CACHE["data"] and current_time - CACHE["timestamp"] < CACHE_TTL:
        return {"jobs": CACHE["data"]}

    user_profile = {
        "skills": ["Python", "Data", "ML"],
        "preferred_role": "Data Analyst",
        "experience": "fresher"
    }

    in_office_jobs = discover_jobs(user_profile, limit=20)
    remote_jobs = fetch_remote_jobs(user_profile, limit=20)

    all_jobs = in_office_jobs + remote_jobs

    top_jobs = select_top_jobs(
        all_jobs,
        user_profile["skills"],
        top_n=5
    )

    CACHE["data"] = top_jobs
    CACHE["timestamp"] = current_time

    return {"jobs": top_jobs}
