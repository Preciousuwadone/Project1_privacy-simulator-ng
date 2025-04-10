import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #232526, #414345)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        🛡️ Digital Privacy Risk Test
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", maxWidth: "600px" }}>
        See how exposed your data might be online. Take our quick survey and find out your privacy risk score.
      </p>
      <button
        onClick={() => navigate("/survey")}
        style={{
          backgroundColor: "#FACC15",
          color: "#111",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#eab308"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#FACC15"}
      >
        Start Survey
      </button>
    </div>
  );
};

export default Home;
