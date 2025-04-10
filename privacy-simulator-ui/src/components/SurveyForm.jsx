import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitSurvey } from "../services/api";

const getUserId = () => {
  let userId = localStorage.getItem("privacy_user_id");
  if (!userId) {
    userId = Date.now().toString();
    localStorage.setItem("privacy_user_id", userId);
  }
  return userId;
};

const SurveyForm = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });

  const handleChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserId();

    try {
      const result = await submitSurvey({ answers, userId });
      navigate("/results", { state: { result } });
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #1f4037, #99f2c8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          maxWidth: "600px",
          width: "100%"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "bold" }}>
          📋 Privacy Risk Survey
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Do you use the same password for multiple sites?</label><br />
          <label><input type="radio" name="q1" value="Yes" onChange={() => handleChange("q1", "Yes")} /> Yes</label><br />
          <label><input type="radio" name="q1" value="No" onChange={() => handleChange("q1", "No")} /> No</label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>How often do you review app permissions?</label><br />
          <select
            value={answers.q2}
            onChange={(e) => handleChange("q2", e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">-- Select --</option>
            <option value="Always">Always</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Never">Never</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Do you reuse passwords across sites?</label><br />
          <label><input type="radio" name="q3" value="Yes" onChange={() => handleChange("q3", "Yes")} /> Yes</label><br />
          <label><input type="radio" name="q3" value="No" onChange={() => handleChange("q3", "No")} /> No</label>
        </div>

        <button type="submit" style={{
          backgroundColor: "#FACC15",
          color: "#000",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          width: "100%",
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#eab308"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#FACC15"}
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
