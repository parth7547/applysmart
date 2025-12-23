def score_job(job, user_skills):
    score = 0
    title = job["title"].lower()
    description = job.get("description", "").lower()

    # Experience signal
    if "fresher" in title or "intern" in title or "junior" in title:
        score += 3
    elif "0-1" in description or "entry" in description:
        score += 2
    elif "2+" in description or "3+" in description:
        score -= 3

    # Role title relevance
    keywords = ["junior", "intern", "associate", "trainee"]
    if any(k in title for k in keywords):
        score += 2

    # Skill match
    for skill in user_skills:
        if skill.lower() in description:
            score += 2

    return score


def select_top_jobs(jobs, user_skills, top_n=5):
    for job in jobs:
        job["score"] = score_job(job, user_skills)

    ranked = sorted(jobs, key=lambda x: x["score"], reverse=True)
    return ranked[:top_n]
