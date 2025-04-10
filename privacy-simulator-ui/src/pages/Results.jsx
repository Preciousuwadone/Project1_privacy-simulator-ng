import React from "react";
import ResultDashboard from "../components/ResultDashboard";

export default function Results() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        <ResultDashboard />
      </div>
    </div>
  );
}
