from agent.job_selector import select_top_jobs
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    user_skills = ["Python", "Data", "ML"]

    jobs = [
        {
            "title": "Junior Data Analyst",
            "company": "ABC Tech",
            "location": "Remote",
            "description": "Entry level role requiring Python and data analysis",
            "apply_url": "https://example.com/apply/1",
            "why": "Fresher-friendly role matching your Python skills"
        },
        {
            "title": "Senior Data Analyst",
            "company": "BigCorp",
            "location": "Mumbai",
            "description": "3+ years experience required",
            "apply_url": "https://example.com/apply/2",
            "why": "Less suitable due to experience requirement"
        },
        {
            "title": "Machine Learning Intern",
            "company": "DataLabs",
            "location": "Bangalore",
            "description": "Internship for students with ML and Python knowledge",
            "apply_url": "https://example.com/apply/3",
            "why": "Strong match for ML fundamentals"
        },
        {
            "title": "Associate Data Scientist",
            "company": "Insight Corp",
            "location": "Hybrid",
            "description": "Junior role working with data and models",
            "apply_url": "https://example.com/apply/4",
            "why": "Good exposure role for freshers"
        },
        {
            "title": "Business Analyst",
            "company": "GrowthX",
            "location": "Remote",
            "description": "Analyst role focusing on reporting and dashboards",
            "apply_url": "https://example.com/apply/5",
            "why": "Entry-level analysis role"
        },
        {
            "title": "AI Research Intern",
            "company": "InnovateAI",
            "location": "Pune",
            "description": "Internship in NLP and Python",
            "apply_url": "https://example.com/apply/6",
            "why": "Relevant for AI learning"
        }
    ]

    top_jobs = select_top_jobs(jobs, user_skills, top_n=5)
    return {"jobs": top_jobs}

