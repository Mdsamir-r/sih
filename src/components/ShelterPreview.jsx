import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ShelterPreview() {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState("cold");
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // References to dynamic 3D elements
  const sceneRef = useRef(null);
  const shelterGroupRef = useRef(null);
  const materialsRef = useRef({});

  useEffect(() => {
    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 450;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06192b);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(9, 6, 11);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.innerHTML = "";
    currentMount.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x00f2a9, 1.4);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x00d2ff, 0.9);
    rimLight.position.set(-10, -5, -10);
    scene.add(rimLight);

    // Ground Grid Helper
    const grid = new THREE.GridHelper(20, 20, 0x00f2a9, 0x142e47);
    grid.position.y = -0.01;
    scene.add(grid);

    // 5. Build 3D Modular Shelter Assembly
    const shelterGroup = new THREE.Group();
    shelterGroupRef.current = shelterGroup;

    // Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1a334d,
      roughness: 0.4,
      wireframe: false,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x00f2a9,
      roughness: 0.2,
      metalness: 0.3,
      wireframe: false,
    });
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x0b2540,
      metalness: 0.8,
      roughness: 0.1,
    });
    const foundationMat = new THREE.MeshStandardMaterial({
      color: 0x0d2135,
      roughness: 0.9,
    });

    materialsRef.current = { baseMat, roofMat };

    // Foundation Base
    const foundationGeo = new THREE.BoxGeometry(6.4, 0.4, 5.4);
    const foundation = new THREE.Mesh(foundationGeo, foundationMat);
    foundation.position.y = 0.2;
    shelterGroup.add(foundation);

    // Main Cabin Envelope
    const cabinGeo = new THREE.BoxGeometry(5.6, 2.8, 4.6);
    const cabin = new THREE.Mesh(cabinGeo, baseMat);
    cabin.position.y = 1.8;
    shelterGroup.add(cabin);

    // Gabled Roof
    const roofGeo = new THREE.ConeGeometry(4.2, 1.6, 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3.9;
    roof.rotation.y = Math.PI / 4;
    shelterGroup.add(roof);

    // Rooftop Solar Array Panels
    const solarGeo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
    const solarPanel = new THREE.Mesh(solarGeo, solarMat);
    solarPanel.position.set(0, 4.2, 0.8);
    solarPanel.rotation.x = -0.35;
    shelterGroup.add(solarPanel);

    // Front Shelter Entryway Glass
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
    });
    const doorGeo = new THREE.BoxGeometry(1.2, 1.9, 0.1);
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 1.4, 2.31);
    shelterGroup.add(door);

    // Passive Air Intake Flues (Left & Right)
    const ventGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16);
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x00f2a9 });
    
    const ventLeft = new THREE.Mesh(ventGeo, ventMat);
    ventLeft.position.set(-2.4, 3.2, 1.6);
    shelterGroup.add(ventLeft);

    const ventRight = new THREE.Mesh(ventGeo, ventMat);
    ventRight.position.set(2.4, 3.2, 1.6);
    shelterGroup.add(ventRight);

    scene.add(shelterGroup);

    // 6. Interactive Mouse Drag Orbit Controls (Vanilla)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      shelterGroup.rotation.y += deltaX * 0.008;
      shelterGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    currentMount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 7. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        shelterGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handling
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [autoRotate]);

  // Handle Zone Toggle (Material visual switch)
  const handleZoneChange = (zone) => {
    setActiveZone(zone);
    if (!materialsRef.current.roofMat) return;

    if (zone === "cold") {
      materialsRef.current.roofMat.color.setHex(0x00f2a9); // High retention Alpine green
      materialsRef.current.baseMat.color.setHex(0x1a334d);
    } else {
      materialsRef.current.roofMat.color.setHex(0xffffff); // High Albedo Cool Roof
      materialsRef.current.baseMat.color.setHex(0xd4a373); // Terracotta Thermal Mass
    }
  };

  // Toggle Wireframe
  const handleWireframeToggle = () => {
    const nextState = !wireframe;
    setWireframe(nextState);
    if (materialsRef.current.roofMat) {
      materialsRef.current.roofMat.wireframe = nextState;
      materialsRef.current.baseMat.wireframe = nextState;
    }
  };

  return (
    <section id="explore" className="section-wrapper">
      <div className="section-head">
        <span>INTERACTIVE 3D PROTOTYPE</span>
        <h2>3D Smart Shelter Digital Twin</h2>
        <p>
          Drag with mouse to rotate and inspect the passive ventilation geometry,
          rooftop solar array, and double-cavity envelope in 3D space.
        </p>
      </div>

      <div className="panel-container" style={{ position: "relative", padding: "10px" }}>
        {/* 3D Viewport Controls Bar */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            zIndex: 10,
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            className={`btn-tab ${activeZone === "cold" ? "active" : ""}`}
            onClick={() => handleZoneChange("cold")}
          >
            🏔️ Alpine High-Insulation Model
          </button>
          <button
            className={`btn-tab ${activeZone === "hot" ? "active" : ""}`}
            onClick={() => handleZoneChange("hot")}
          >
            🏜️ Arid Cool-Roof PCM Model
          </button>
          <button
            className="btn-tab"
            onClick={handleWireframeToggle}
            style={{ borderColor: wireframe ? "#00f2a9" : "" }}
          >
            {wireframe ? "Solid Mesh" : "Wireframe CAD View"}
          </button>
          <button
            className="btn-tab"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Pause Spin" : "Auto Spin"}
          </button>
        </div>

        {/* 3D Canvas Mount Point */}
        <div
          ref={mountRef}
          style={{
            width: "100%",
            height: "480px",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "grab",
          }}
        />

        {/* 3D Model Spec Overlay */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            marginTop: "16px",
            padding: "10px",
          }}
        >
          <div className="mini-box">
            <span>Rooftop Angle</span>
            <strong style={{ color: "#00f2a9" }}>32° Bioclimatic Pitch</strong>
          </div>
          <div className="mini-box">
            <span>Passive Convection</span>
            <strong style={{ color: "#00d2ff" }}>Dual Flue Stack Effect</strong>
          </div>
          <div className="mini-box">
            <span>Wall Cavity Core</span>
            <strong style={{ color: "#ffffff" }}>Bio-PCM Latent Layer (40mm)</strong>
          </div>
          <div className="mini-box">
            <span>Solar Input Array</span>
            <strong style={{ color: "#00f2a9" }}>450W Bifacial Monocrystalline</strong>
          </div>
        </div>
      </div>
    </section>
  );
}