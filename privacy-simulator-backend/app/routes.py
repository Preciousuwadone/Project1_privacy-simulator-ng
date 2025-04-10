from flask import Blueprint, request, jsonify
from . import db  # your Firebase Firestore client
from datetime import datetime
from firebase_admin import firestore

main = Blueprint("main", __name__)  # Blueprint name

# --------------------------
# 1. SUBMIT ROUTE
# --------------------------
@main.route("/submit", methods=["POST"])
def submit():
    data = request.json
    answers = data.get("answers", {})

    score = sum(
        1 for answer in answers.values()
        if isinstance(answer, str) and answer.lower() in ["yes", "never"]
    )
    risk = "High" if score >= 3 else "Medium" if score >= 1 else "Low"

    result = {
        "answers": answers,
        "score": score,
        "riskLevel": risk,
        "submittedAt": firestore.SERVER_TIMESTAMP,
        "userId": data.get("userId", "unknown")
    }

    # Save to Firestore
    db.collection("surveyResults").add(result)

    # Return safe preview (e.g. timestamp manually added)
    response_result = result.copy()
    response_result["submittedAt"] = str(datetime.utcnow())

    return jsonify(response_result)


# --------------------------
# 2. HISTORY ROUTE (for Chart)
# --------------------------
@main.route("/history/<user_id>", methods=["GET"])
def get_user_history(user_id):
    try:
        print(f"📦 Fetching history for userId: {user_id}")

        docs = (
            db.collection("surveyResults")
            .where("userId", "==", user_id)
            .order_by("submittedAt")
            .stream()
        )

        results = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            # Convert Firestore timestamp to ISO format for frontend
            if "submittedAt" in data and hasattr(data["submittedAt"], "isoformat"):
                data["submittedAt"] = data["submittedAt"].isoformat()
            results.append(data)

        return jsonify(results)

    except Exception as e:
        print("❌ Error fetching history:", e)
        return jsonify({"error": str(e)}), 500
