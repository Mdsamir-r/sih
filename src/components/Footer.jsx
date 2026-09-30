import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#020c15", borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "40px 4% 30px 4%" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "28px", height: "28px", border: "1.5px solid #00f2a9", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#00f2a9", fontSize: "0.9rem" }}>
              ⌂
            </div>
            <strong style={{ fontSize: "1.1rem", letterSpacing: "1px", color: "#ffffff" }}>SAMET SHELTER</strong>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#7997b5", maxWidth: "460px" }}>
            Smart India Hackathon Innovation: Climate-Adaptive Modular Smart Habitats for Disaster Relief & High Thermal Stress Regions.
          </p>
        </div>

        <div style={{ textAlign: "right", fontSize: "0.78rem", color: "#7997b5" }}>
          <p style={{ color: "#ffffff", fontWeight: 600, marginBottom: "4px" }}>
            LNCT University • CSE & AIML Research Group
          </p>
          <p>© {new Date().getFullYear()} SAMET Open Architecture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}