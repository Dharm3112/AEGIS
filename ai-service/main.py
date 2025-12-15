from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class RequestText(BaseModel):
    description: str


@app.post("/analyze")
def analyze_urgency(data: RequestText):
    text = data.description.lower()
    score = 1  # Default Low Priority

    # Simple Keyword Logic (No complex models needed for MVP)
    critical_keywords = ["fire", "blood", "trapped", "unconscious", "flood", "heart"]
    medium_keywords = ["food", "water", "blanket", "cold"]

    if any(word in text for word in critical_keywords):
        score = 5  # Critical
    elif any(word in text for word in medium_keywords):
        score = 3  # Medium

    return {"priority_score": score}

# To Run: uvicorn main:app --reload --port 8000