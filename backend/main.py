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
    jobs = [
        {
            "title": "Junior Data Analyst",
            "company": "ABC Tech",
            "location": "Remote",
            "why": "Matches Python skills and entry-level requirement",
            "apply_url": "https://example.com/apply/1"
        },
        {
            "title": "Machine Learning Intern",
            "company": "DataLabs",
            "location": "Bangalore",
            "why": "Good fit for ML fundamentals and internship seekers",
            "apply_url": "https://example.com/apply/2"
        },
        {
            "title": "AI Research Assistant",
            "company": "InnovateAI",
            "location": "Pune",
            "why": "Requires Python and basic NLP knowledge",
            "apply_url": "https://example.com/apply/3"
        },
        {
            "title": "Associate Data Scientist",
            "company": "Insight Corp",
            "location": "Hybrid",
            "why": "Junior role with strong learning exposure",
            "apply_url": "https://example.com/apply/4"
        },
        {
            "title": "Business Data Analyst",
            "company": "GrowthX",
            "location": "Remote",
            "why": "Entry-level role focused on analysis and reporting",
            "apply_url": "https://example.com/apply/5"
        }
    ]
    return {"jobs": jobs}
