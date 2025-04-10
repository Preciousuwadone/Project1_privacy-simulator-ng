from flask import Blueprint, request, jsonify
from . import db  # This is correct
from datetime import datetime
from firebase_admin import firestore


main = Blueprint("main", __name__)  # This name must match

@main.route("/submit", methods=["POST"])
def submit():
    data = request.json
    answers = data.get("answers", {})

    score = sum(
        1 for answer in answers.values()
        if isinstance(answer, str) and answer.lower() in ["yes", "never"]
    )
    risk = "High" if score >= 4 else "Medium" if score >= 2 else "Low"

    result = {
        "answers": answers,
        "score": score,
        "riskLevel": risk,
        "submittedAt": firestore.SERVER_TIMESTAMP,
        "userId": data.get("userId", "unknown")
    }

    # Save to Firestore
    db.collection("surveyResults").add(result)

    # Prepare safe response
    response_result = result.copy()
    response_result["submittedAt"] = str(datetime.utcnow())

    return jsonify(response_result)
