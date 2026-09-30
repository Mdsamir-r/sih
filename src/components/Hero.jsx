import React, { useState, useEffect } from "react";

const drdoPresets = {
  "Leh, Ladakh (Cold High-Altitude)": {
    temp: -8.5,
    condition: "High Solar Radiation",
    humidity: "24%",
    wind: "14 km/h",
    solar: "980 W/m²",
    comfortScore: 88,
    comfortStatus: "Self-Sustained",
    comfortDesc: "Thermal mass trapping solar energy",
    short: "Leh, Ladakh",
  },
  "Drass Sector (Sub-Zero Extreme)": {
    temp: -22.0,
    condition: "Freezing Clear Sky",
    humidity: "18%",
    wind: "22 km/h",
    solar: "920 W/m²",
    comfortScore: 78,
    comfortStatus: "PCM Buffered",
    comfortDesc: "Latent heat arrest engaged",
    short: "Drass, Kargil",
  },
  "Bhopal, MP (Composite Baseline)": {
    temp: 34.0,
    condition: "Clear Sky",
    humidity: "48%",
    wind: "12 km/h",
    solar: "820 W/m²",
    comfortScore: 72,
    comfortStatus: "Stable",
    comfortDesc: "Passive cross ventilation active",
    short: "Bhopal, MP",
  },
};

export default function Hero({ onExploreClick }) {
  const [selectedCity, setSelectedCity] = useState("Leh, Ladakh (Cold High-Altitude)");
  const [telemetry, setTelemetry] = useState(drdoPresets[selectedCity]);

  useEffect(() => {
    setTelemetry(drdoPresets[selectedCity]);
  }, [selectedCity]);

  return (
    <section className="hero-wrapper" id="hero">
      <div className="hero-bg" />

      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-tagline">
            DRDO ID: 26051 • High Altitude Defense Habitat • Zero Fossil Fuels
          </p>
          <h1 className="hero-title">
            Area-Specific Smart <br />
            Shelter <br />
            <span className="highlight">for Thermal Comfort</span>
          </h1>
          <p className="hero-desc">
            Computational design framework tailored for Ladakh's 1900-2100 kWh/m²/year solar
            asset. Simulates steady-state & transient heat losses to maintain 18°C-22°C interior comfort
            at -25°C ambient conditions without external kerosene bukharis.
          </p>

          <div className="location-selector">
            <label>Select Deployment Sector</label>
            <div className="location-dropdown">
              <span>📍</span>
              <select
                className="location-select-input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {Object.keys(drdoPresets).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-explore" onClick={onExploreClick}>
            Run ANSYS Thermal Model →
          </button>
        </div>

        <div className="hero-telemetry-panels">
          <div className="glass-card">
            <div className="weather-header">
              <span>📍 {telemetry.short}</span>
              <span style={{ fontSize: "0.72rem", color: "#00f2a9" }}>HIGH ALTITUDE DNI</span>
            </div>
            <div className="weather-temp-row">
              <span className="weather-temp">❄ {telemetry.temp}°C</span>
              <span className="weather-condition">{telemetry.condition}</span>
            </div>
            <div className="weather-subgrid">
              <div className="weather-sub-item">
                <span>Humidity</span>
                <strong>{telemetry.humidity}</strong>
              </div>
              <div className="weather-sub-item">
                <span>Wind Speed</span>
                <strong>{telemetry.wind}</strong>
              </div>
              <div className="weather-sub-item">
                <span>Direct Solar</span>
                <strong>{telemetry.solar}</strong>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="comfort-heading">DRDO Thermal Comfort Benchmark</div>
            <div className="comfort-display">
              <div className="comfort-circle">{telemetry.comfortScore}</div>
              <div className="comfort-status">
                <h4>{telemetry.comfortStatus}</h4>
                <p>{telemetry.comfortDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}