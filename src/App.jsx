import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureStrip from "./components/FeatureStrip";
import ShelterPreview from "./components/ShelterPreview";
import HowItWorks from "./components/HowItWorks";
import AreaAnalysis from "./components/AreaAnalysis";
import ThermalComfort from "./components/ThermalComfort";
import ANSYSThermalContour from "./components/ANSYSThermalContour";
import MaterialComparison from "./components/MaterialComparison";
import QRDeployment from "./components/QRDeployment";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const handleScrollToExplore = () => {
    const el = document.getElementById("explore");
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="samet-app">
      <Navbar />
      <main>
        <div id="hero">
          <Hero onExploreClick={handleScrollToExplore} />
        </div>
        <FeatureStrip />
        <div id="explore">
          <ShelterPreview />
        </div>
        <div id="design">
          <HowItWorks />
        </div>
        <div id="area-analysis">
          <AreaAnalysis />
        </div>
        <div id="thermal-comfort">
          <ThermalComfort />
        </div>
        <ANSYSThermalContour />
        <MaterialComparison />
        <div id="qr-deployment">
          <QRDeployment />
        </div>
      </main>
      <Footer />
    </div>
  );
}