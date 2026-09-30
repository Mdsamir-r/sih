import React from "react";

export default function MaterialComparison() {
  const comparativeTable = [
    {
      material: "Aerogel Blankets + Phase Change Core (Proposed DRDO Design)",
      kValue: "0.018 W/m·K",
      decayRate: "0.4°C / hour",
      insideMorning: "+18.2°C",
      fuelSaved: "1,450 Liters/year",
      status: "Optimal",
      tagColor: "#00f2a9",
    },
    {
      material: "High-Density Glasswool (100mm) + Steel Cladding",
      kValue: "0.042 W/m·K",
      decayRate: "1.8°C / hour",
      insideMorning: "+3.5°C",
      fuelSaved: "620 Liters/year",
      status: "Moderate",
      tagColor: "#00d2ff",
    },
    {
      material: "Expanded Polystyrene (EPS) Standard Puf Panels",
      kValue: "0.038 W/m·K",
      decayRate: "2.1°C / hour",
      insideMorning: "+1.0°C",
      fuelSaved: "710 Liters/year",
      status: "Deficient",
      tagColor: "#ffb74d",
    },
    {
      material: "Traditional Military Canvas / Corrugated Iron Tin",
      kValue: "0.250 W/m·K",
      decayRate: "4.6°C / hour",
      insideMorning: "-19.0°C (Freezing)",
      fuelSaved: "0 Liters (100% Bukari Dependent)",
      status: "Critical Failure",
      tagColor: "#ff5252",
    },
  ];

  return (
    <section id="material-comparison" className="section-wrapper">
      <div className="section-head">
        <span>TRADE-OFF & EFFICIENCY MATRIX</span>
        <h2>Comparative Material Performance Benchmark</h2>
        <p>
          Evaluating envelope composites under uniform boundary conditions (Ambient: -20°C,
          Solar Irradiance: 900 W/m² for 7.9 hours).
        </p>
      </div>

      <div className="panel-container" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", color: "#7997b5" }}>
              <th style={{ padding: "12px 14px" }}>ENVELOPE COMPOSITE</th>
              <th style={{ padding: "12px 14px" }}>CONDUCTIVITY (k)</th>
              <th style={{ padding: "12px 14px" }}>NIGHT HEAT DECAY</th>
              <th style={{ padding: "12px 14px" }}>06:00 AM INSIDE TEMP</th>
              <th style={{ padding: "12px 14px" }}>DIESEL / KEROSENE SAVED</th>
              <th style={{ padding: "12px 14px" }}>EVALUATION</th>
            </tr>
          </thead>
          <tbody>
            {comparativeTable.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: i === 0 ? "rgba(0, 242, 169, 0.04)" : "transparent",
                }}
              >
                <td style={{ padding: "14px", fontWeight: i === 0 ? "700" : "500", color: i === 0 ? "#ffffff" : "#c4d1db" }}>
                  {row.material}
                </td>
                <td style={{ padding: "14px", fontFamily: "var(--font-mono)", color: "#00d2ff" }}>
                  {row.kValue}
                </td>
                <td style={{ padding: "14px" }}>{row.decayRate}</td>
                <td style={{ padding: "14px", fontWeight: "700", color: row.tagColor }}>
                  {row.insideMorning}
                </td>
                <td style={{ padding: "14px", color: "#00f2a9" }}>{row.fuelSaved}</td>
                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${row.tagColor}`,
                      color: row.tagColor,
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}