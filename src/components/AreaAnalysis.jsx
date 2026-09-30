import React, { useState } from "react";

const REGIONAL_CLIMATE_MATRIX = {
  ladakh: {
    region: "Ladakh (High Altitude Cold Desert)",
    annualRadiation: "1,950 - 2,120 kWh/m²/year",
    avgSunshineHours: "7.9 hrs/day (300+ cloud-free days)",
    winterExtreme: "-25.0°C to -35.0°C",
    diurnalSwing: "18°C to 24°C daily fluctuation",
    dominantChallenge: "High solar trapping during daytime but severe conductive collapse after sunset.",
    ansysBoundary: "Radiation: Rosseland model; Convection: Rayleigh natural circulation; Conduction: Multi-layer 1D/3D transient diffusion.",
    recommendedStrategy: "Passive Trombe wall with high latent-heat PCM (melting point 21-24°C) on South facade + hermetic air locks.",
  },
  siachen: {
    region: "Siachen / North Glacier Sector",
    annualRadiation: "1,820 kWh/m²/year",
    avgSunshineHours: "6.8 hrs/day",
    winterExtreme: "-45.0°C (High Blizzard Wind Vector)",
    diurnalSwing: "12°C daily fluctuation",
    dominantChallenge: "Extreme wind chill and infiltration losses through micro-openings.",
    ansysBoundary: "High external turbulent kinetic energy (k-epsilon turbulence) with sub-zero boundary layer convection.",
    recommendedStrategy: "Aerogel Vacuum core with aerodynamic vaulted shell to deflect blizzard wind load.",
  },
  bhopal: {
    region: "Bhopal (Composite Plateau Zone)",
    annualRadiation: "1,800 kWh/m²/year",
    avgSunshineHours: "7.4 hrs/day",
    winterExtreme: "+8.5°C / Summer: +43.0°C",
    diurnalSwing: "14°C daily fluctuation",
    dominantChallenge: "Dual seasonal demands: overheating in summer and moderate cold in winter.",
    ansysBoundary: "Solar radiation ray-tracing with natural buoyancy driven attic stack effect.",
    recommendedStrategy: "Reversible night flush louvers with phase change ceiling dampers.",
  },
};

export default function AreaAnalysis() {
  const [selectedKey, setSelectedKey] = useState("ladakh");
  const data = REGIONAL_CLIMATE_MATRIX[selectedKey];

  return (
    <section id="area-analysis" className="section-wrapper">
      <div className="section-head">
        <span>DRDO FIELD FEASIBILITY ANALYSIS</span>
        <h2>High Altitude Solar Radiation & Atmospheric Data</h2>
        <p>
          Targeting Ladakh's unique solar asset (1900-2100 kWh/m²/year) to eliminate fossil-fuel
          kerosene heating bukharis through standalone passive engineering.
        </p>
      </div>

      <div className="panel-container">
        <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
          {Object.keys(REGIONAL_CLIMATE_MATRIX).map((k) => (
            <button
              key={k}
              className={`btn-tab ${selectedKey === k ? "active" : ""}`}
              onClick={() => setSelectedKey(k)}
            >
              📍 {REGIONAL_CLIMATE_MATRIX[k].region.split("(")[0]}
            </button>
          ))}
        </div>

        <div className="grid-3">
          <div className="mini-box">
            <span>Annual Solar Resource</span>
            <h3 style={{ color: "#00f2a9", fontSize: "1.3rem" }}>{data.annualRadiation}</h3>
            <p style={{ fontSize: "0.75rem", color: "#7997b5", marginTop: "4px" }}>
              Ladakh high-intensity DNI index
            </p>
          </div>

          <div className="mini-box">
            <span>Sunshine Duration</span>
            <h3 style={{ color: "#00d2ff", fontSize: "1.3rem" }}>{data.avgSunshineHours}</h3>
            <p style={{ fontSize: "0.75rem", color: "#7997b5", marginTop: "4px" }}>
              Annual cloud-free availability
            </p>
          </div>

          <div className="mini-box">
            <span>Winter Sub-Zero Extreme</span>
            <h3 style={{ color: "#ff6b6b", fontSize: "1.3rem" }}>{data.winterExtreme}</h3>
            <p style={{ fontSize: "0.75rem", color: "#7997b5", marginTop: "4px" }}>
              Critical design safety envelope
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: "18px" }}>
          <div className="mini-box">
            <span style={{ color: "#00d2ff" }}>ANSYS Computational Boundary Definition</span>
            <p style={{ fontSize: "0.85rem", color: "#f5f8fa", marginTop: "6px" }}>
              {data.ansysBoundary}
            </p>
          </div>

          <div className="mini-box">
            <span style={{ color: "#00f2a9" }}>Primary Regional Failure Mechanism</span>
            <p style={{ fontSize: "0.85rem", color: "#f5f8fa", marginTop: "6px" }}>
              {data.dominantChallenge}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "18px", background: "#0a2238", padding: "16px", borderRadius: "10px", borderLeft: "4px solid #00f2a9" }}>
          <span style={{ fontSize: "0.74rem", color: "#00f2a9", fontWeight: "700" }}>
            DRDO PASSIVE ARCHITECTURE STRATEGY
          </span>
          <p style={{ fontSize: "0.88rem", color: "#ffffff", marginTop: "4px" }}>
            {data.recommendedStrategy}
          </p>
        </div>
      </div>
    </section>
  );
}