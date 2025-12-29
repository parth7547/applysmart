from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

from agent.search_discovery import discover_jobs
from agent.remote_fetcher import fetch_remote_jobs
from agent.job_selector import select_top_jobs

from fastapi import Depends
from agent.auth import get_current_user   # adjust import if needed


# ---------------- CONFIG ----------------
CACHE = {
    "data": None,
    "timestamp": 0
}

CACHE_TTL = 1800  # 30 minutes


# ---------------- APP ----------------
app = FastAPI(title="ApplySmart Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- MODELS ----------------
class UserProfile(BaseModel):
    preferred_role: str
    location_preference: str
    experience_level: str


# ---------------- ROUTES ----------------
@app.get("/")
def root():
    return {"status": "ApplySmart backend running"}


@app.get("/jobs/today")
def get_todays_jobs():
    current_time = time.time()

    # Cache
    if CACHE["data"] and current_time - CACHE["timestamp"] < CACHE_TTL:
        return {"jobs": CACHE["data"]}

    # Safe default profile (deploy-safe)
    user_profile = {
        "preferred_role": "Any",
        "location": "Any",
        "experience": "Any",
        "skills": [],
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



@app.get("/auth/me")
def auth_me(user = Depends(get_current_user)):
    return {
        "id": user["id"],
        "email": user["email"]
    }
