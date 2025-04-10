const API_URL = "http://localhost:5000";

export const submitSurvey = async ({ answers, userId }) => {
  try {
    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers, userId }),
    });

    if (!response.ok) {
      throw new Error("Survey submission failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting survey:", error);
    throw error;
  }
};
