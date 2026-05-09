"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroGlass() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ─────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.z = 6.5;

    // ── Renderer ───────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Glass mesh ─────────────────────────────────────────────────────
    const geometry = new THREE.BoxGeometry(1.8, 2.85, 0.22, 1, 1, 1);

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#B8D4F5"),
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      thickness: 1.5,
      transparent: true,
      opacity: 1,
      ior: 1.5,
      reflectivity: 0.5,
      iridescence: 0.25,
      iridescenceIOR: 1.4,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── Edge highlight ─────────────────────────────────────────────────
    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#4DDFFF"),
      transparent: true,
      opacity: 0.35,
    });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    scene.add(edges);

    // ── Lighting ───────────────────────────────────────────────────────
    // Main: top-right catch
    const dirLight = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight.position.set(4, 6, 3);
    scene.add(dirLight);

    // Fill: bottom-left, subtle cyan tint
    const fillLight = new THREE.DirectionalLight(0x4ddfff, 1.2);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // Ambient: keep from going fully dark
    const ambient = new THREE.AmbientLight(0x4ddfff, 0.4);
    scene.add(ambient);

    // Point: specular sparkle from front-right
    const pointLight = new THREE.PointLight(0xffffff, 2.5, 12);
    pointLight.position.set(2.5, 2, 3.5);
    scene.add(pointLight);

    // ── Interaction state ──────────────────────────────────────────────
    let targetRotY = 0;
    let currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // -0.5 (full left) → 0.5 (full right)
      const nx = e.clientX / window.innerWidth - 0.5;
      // max ±25 deg
      targetRotY = nx * ((25 * Math.PI) / 180) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Idle float on Y
      const floatY = Math.sin(t * 0.72) * 0.13;

      // Smooth mouse rotation
      currentRotY += (targetRotY - currentRotY) * 0.045;

      // Scroll: tip toward viewer (negative X) + fade out
      const scrollRotX = -scrollProgress * (Math.PI * 0.38);
      const alpha = 1 - scrollProgress;

      // Apply to both mesh and edges
      [mesh, edges].forEach((obj) => {
        obj.position.y = floatY;
        obj.rotation.y = currentRotY;
        obj.rotation.x = scrollRotX;
      });

      material.opacity = alpha;
      edgesMat.opacity = 0.35 * alpha;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
