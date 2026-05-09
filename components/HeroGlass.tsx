"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const FOV = 55;
const CAM_Z = 1.5;
const MAX_ROT = (12 * Math.PI) / 180; // 12 degrees in radians
const LERP = 0.04;

export default function HeroGlass() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── Scene & camera ─────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.01, 50);
    camera.position.z = CAM_Z;

    const planeSize = (w: number, h: number) => {
      const ph = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z;
      return { pw: ph * (w / h), ph };
    };

    // ── Renderer ───────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText =
      "position:absolute;top:0;left:0;pointer-events:none;display:block;";
    mount.appendChild(renderer.domElement);

    // ── Glass panel (no segment subdivisions — rigid single piece) ─────
    let { pw, ph } = planeSize(width, height);

    const geo = new THREE.PlaneGeometry(pw, ph);
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e5f3fb"),
      metalness: 0,
      roughness: 0.0,
      transmission: 1.0,
      thickness: 2.0,
      transparent: true,
      opacity: 0.08,
      ior: 1.5,
      envMapIntensity: 1,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Faint edge outline
    const edgeGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(pw, ph));
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#e5f3fb"),
      transparent: true,
      opacity: 0.14,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ── Lighting ───────────────────────────────────────────────────────
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(2, 3, 2);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x4ddfff, 0.3));

    // ── Mouse tilt state ───────────────────────────────────────────────
    // Target and smoothed rotation on X (pitch) and Y (yaw)
    let tRX = 0, tRY = 0; // targets
    let rX = 0, rY = 0;   // smoothed

    const onMouseMove = (e: MouseEvent) => {
      // Normalise to −0.5…0.5 then scale to max rotation
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = -(e.clientY / window.innerHeight - 0.5); // invert Y
      tRY = nx * MAX_ROT * 2;  // left ↔ right tilt
      tRX = ny * MAX_ROT * 2;  // up ↔ down tilt
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll ────────────────────────────────────────────────────────
    let scroll = 0;
    const onScroll = () => {
      scroll = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Slow, heavy lerp — feels like thick glass
      rX += (tRX - rX) * LERP;
      rY += (tRY - rY) * LERP;

      // Scroll drives a forward fold (negative X = top tips toward viewer)
      // and fades out by the time section 2 arrives
      const foldX = -scroll * Math.PI * 0.55;
      const alpha = 1 - scroll;

      mesh.rotation.x = rX + foldX;
      mesh.rotation.y = rY;
      edges.rotation.x = rX + foldX;
      edges.rotation.y = rY;

      mat.opacity = 0.08 * alpha;
      edgeMat.opacity = 0.14 * alpha;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const { pw: npw, ph: nph } = planeSize(width, height);
      mesh.scale.set(npw / pw, nph / ph, 1);
      edges.scale.set(npw / pw, nph / ph, 1);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 15% padding top and bottom — floats in middle, edge-to-edge left/right
  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: "15%",
        bottom: "15%",
        left: 0,
        right: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}
