import React from "react";

const featureItems = [
  {
    icon: "❖",
    title: "Climate Based Design",
    desc: "Uses real weather & geographic data.",
  },
  {
    icon: "◇",
    title: "Thermal Comfort",
    desc: "Keeps you cool in heat and warm in cold.",
  },
  {
    icon: "⚡",
    title: "Energy Efficient",
    desc: "Solar, ventilation & smart materials.",
  },
  {
    icon: "🌱",
    title: "Sustainable & Affordable",
    desc: "Better living for people and planet.",
  },
];

export default function FeatureStrip() {
  return (
    <div className="feature-strip">
      <div className="feature-grid">
        {featureItems.map((item, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon-wrapper">{item.icon}</div>
            <div className="feature-text">
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}