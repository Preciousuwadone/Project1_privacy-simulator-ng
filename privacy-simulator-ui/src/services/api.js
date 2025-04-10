import axios from 'axios';

const API_URL = "http://localhost:5000";

export const submitSurvey = async ({ answers, userId }) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, {
      answers,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting survey:", error);
    throw error;
  }
};
