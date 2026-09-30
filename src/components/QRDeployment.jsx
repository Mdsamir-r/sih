import React, { useState } from "react";

export default function QRDeployment() {
  const [nodeId, setNodeId] = useState("SAMET-SIH-9921");
  const [syncStatus, setSyncStatus] = useState("Idle");
  const [payloadLogs, setPayloadLogs] = useState([]);

  const handleSimulateSync = () => {
    setSyncStatus("Syncing...");
    setTimeout(() => {
      setSyncStatus("Registered");
      const timestamp = new Date().toLocaleTimeString();
      setPayloadLogs((prev) => [
        `[${timestamp}] Node ${nodeId} paired via LoRa Gateway. Lat: 23.2599°N, Long: 77.4126°E.`,
        `[${timestamp}] 4.2V Solar LiFePO4 battery connected. Charge: 94%.`,
        `[${timestamp}] Internal PCM Core thermistors calibrated: Normal range.`,
        ...prev,
      ]);
    }, 1200);
  };

  return (
    <section id="qr-deployment" className="section-wrapper">
      <div className="section-head">
        <span>FIELD TELEMETRY & COMMISSIONING</span>
        <h2>On-Site QR Rapid Registration</h2>
        <p>
          First responders scan the physical shelter QR matrix to automatically link IoT sensors to
          the national disaster portal within 30 seconds.
        </p>
      </div>

      <div className="panel-container">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "30px", alignItems: "center" }}>
          {/* Dynamic Mock SVG QR Code */}
          <div style={{ background: "#ffffff", padding: "18px", borderRadius: "14px", width: "180px", height: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg width="144" height="144" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#ffffff" />
              {/* Outer Corners */}
              <rect x="5" y="5" width="28" height="28" fill="#031321" />
              <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
              <rect x="13" y="13" width="12" height="12" fill="#031321" />

              <rect x="67" y="5" width="28" height="28" fill="#031321" />
              <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
              <rect x="75" y="13" width="12" height="12" fill="#031321" />

              <rect x="5" y="67" width="28" height="28" fill="#031321" />
              <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
              <rect x="13" y="75" width="12" height="12" fill="#031321" />

              {/* Data Blocks */}
              <rect x="42" y="10" width="8" height="8" fill="#031321" />
              <rect x="42" y="26" width="8" height="8" fill="#00f2a9" />
              <rect x="18" y="42" width="8" height="8" fill="#031321" />
              <rect x="32" y="42" width="12" height="12" fill="#031321" />
              <rect x="52" y="42" width="8" height="8" fill="#031321" />
              <rect x="70" y="42" width="14" height="8" fill="#00f2a9" />
              <rect x="42" y="62" width="10" height="14" fill="#031321" />
              <rect x="62" y="68" width="14" height="14" fill="#031321" />
              <rect x="82" y="76" width="10" height="10" fill="#031321" />
            </svg>
            <span style={{ fontSize: "0.62rem", color: "#031321", fontWeight: 700, marginTop: "6px" }}>
              SCAN TO COMMISSION
            </span>
          </div>

          <div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#7997b5" }}>Assigned Hardware Unit:</span>
              <strong style={{ color: "#ffffff", fontFamily: "var(--font-mono)" }}>{nodeId}</strong>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
                style={{
                  background: "#092036",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  marginRight: "10px",
                }}
              />
              <button
                className="btn-tab active"
                onClick={handleSimulateSync}
                disabled={syncStatus === "Syncing..."}
              >
                {syncStatus === "Registered" ? "✓ Sync Complete" : "Pair & Deploy Node"}
              </button>
            </div>

            {/* Diagnostic Terminal Stream */}
            <div style={{ background: "#020c15", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", height: "110px", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: "0.74rem" }}>
              <div style={{ color: "#00f2a9" }}>-- SAMET TELEMETRY DAEMON v2.4 (PORT 8080) --</div>
              {payloadLogs.length === 0 ? (
                <div style={{ color: "#5d7e9e", marginTop: "6px" }}>Ready for hardware QR handshake...</div>
              ) : (
                payloadLogs.map((log, index) => (
                  <div key={index} style={{ color: "#9cb3c9", marginTop: "4px" }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}