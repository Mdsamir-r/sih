import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("hero");
  const [searchVal, setSearchVal] = useState("");

  const navLinks = [
    { label: "Home", targetId: "hero" },
    { label: "Explore", targetId: "explore" },
    { label: "Design", targetId: "design" },
    { label: "Area Analysis", targetId: "area-analysis" },
    { label: "Thermal Comfort", targetId: "thermal-comfort" },
    { label: "QR / Deployment", targetId: "qr-deployment" },
  ];

  // Smooth scroll handler
  const handleScrollTo = (targetId) => {
    setActiveTab(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      // 70px navbar height offset
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Auto-detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.getElementById(link.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(link.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="brand" onClick={() => handleScrollTo("hero")} style={{ cursor: "pointer" }}>
        <div className="brand-icon-box">⌂</div>
        <div className="brand-text">
          <h1>SAMET</h1>
          <span>S H E L T E R</span>
        </div>
      </div>

      <nav className="nav-links">
        {navLinks.map((link) => (
          <button
            key={link.targetId}
            type="button"
            className={`nav-btn-link ${activeTab === link.targetId ? "active" : ""}`}
            onClick={() => handleScrollTo(link.targetId)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search location..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
        <div className="user-avatar" title="Officer Portal">
          👤
        </div>
      </div>
    </header>
  );
}