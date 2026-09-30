import React from "react";

const workflowSteps = [
  {
    step: "01",
    tag: "GIS & METEOROLOGY",
    title: "Microclimate Profiling",
    desc: "System fetches solar azimuth angles, wind vectors, dry-bulb/wet-bulb ranges, and diurnal delta for the target deployment coordinates.",
  },
  {
    step: "02",
    tag: "PASSIVE SIMULATION",
    title: "Thermal Envelope Formulation",
    desc: "Calculates optimum wall cavity thickness, PCM phase melting threshold (23°C to 29°C), and awning shading ratios to eliminate thermal bridges.",
  },
  {
    step: "03",
    tag: "AUTONOMOUS IOT",
    title: "Sensor-Actuated Regulation",
    desc: "ESP32 microcontrollers trigger convective solar dampers and HEPA scrubbers only when exterior delta provides natural thermodynamic cooling.",
  },
  {
    step: "04",
    tag: "RELIABILITY GRID",
    title: "Decentralized Telemetry",
    desc: "LoRaWAN & BLE field radios sync battery state of charge, internal PM2.5, CO2, and comfort indices to central disaster management dashboards.",
  },
];

export default function HowItWorks() {
  return (
    <section id="design" className="section-wrapper">
      <div className="section-head">
        <span>ENGINEERING WORKFLOW</span>
        <h2>How SAMET Achieves Zero-Net Comfort</h2>
        <p>
          A four-tier closed-loop pipeline combining architectural passive physics with IoT automation.
        </p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {workflowSteps.map((wf, idx) => (
          <div key={idx} className="panel-container" style={{ position: "relative" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "rgba(0, 242, 169, 0.2)", lineHeight: 1 }}>
              {wf.step}
            </div>
            <span style={{ fontSize: "0.7rem", color: "#00f2a9", fontWeight: 700, letterSpacing: "1px", margin: "10px 0 4px 0", display: "block" }}>
              {wf.tag}
            </span>
            <h3 style={{ fontSize: "1.1rem", color: "#ffffff", marginBottom: "8px" }}>
              {wf.title}
            </h3>
            <p style={{ fontSize: "0.82rem", color: "#7997b5", lineHeight: "1.55" }}>
              {wf.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}