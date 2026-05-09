"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroGlass() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── Camera ─────────────────────────────────────────────────────────
    const FOV = 60; // degrees
    const CAM_Z = 1.5;
    const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.01, 50);
    camera.position.z = CAM_Z;

    // Plane dimensions that exactly fill the viewport at z=0
    const getPlaneSize = (w: number, h: number) => {
      const ph = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z;
      const pw = ph * (w / h);
      return { pw, ph };
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

    // ── Scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Glass plane ────────────────────────────────────────────────────
    const SEGS = 32;
    let { pw, ph } = getPlaneSize(width, height);

    const geo = new THREE.PlaneGeometry(pw, ph, SEGS, SEGS);
    // Store original XY positions for deformation reference
    const orig = Float32Array.from(geo.attributes.position.array);
    const planeHalfW = pw / 2;
    const planeHalfH = ph / 2;

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

    // Very faint edge outline to hint at the glass boundary
    const edgeGeo = new THREE.EdgesGeometry(
      new THREE.PlaneGeometry(pw, ph)
    );
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#e5f3fb"),
      transparent: true,
      opacity: 0.12,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // ── Lighting (edge catches) ────────────────────────────────────────
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x4ddfff, 0.25));

    // ── Mouse state (normalized −1…1) ──────────────────────────────────
    let mx = 0; // target
    let my = 0;
    let smx = 0; // smoothed
    let smy = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2; // −1…1
      my = -(e.clientY / window.innerHeight - 0.5) * 2; // −1…1 (Y flipped)
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll state ───────────────────────────────────────────────────
    let scroll = 0;
    const onScroll = () => {
      scroll = Math.min(1, window.scrollY / window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Animation ──────────────────────────────────────────────────────
    let frameId: number;
    const MAX_BEND = 0.18; // world-unit Z displacement at corners

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth mouse
      smx += (mx - smx) * 0.055;
      smy += (my - smy) * 0.055;

      // Vertex deformation — each vertex displaced in Z proportional to
      // its dot product with the mouse direction, creating a bending warp
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = orig[i * 3];
        const oy = orig[i * 3 + 1];
        const nx = ox / planeHalfW; // −1…1 across plane
        const ny = oy / planeHalfH;
        pos.setZ(i, (smx * nx + smy * ny) * MAX_BEND);
      }
      pos.needsUpdate = true;

      // Scroll: fold the whole panel forward and fade it out
      mesh.rotation.x = scroll * Math.PI * 0.5;
      mat.opacity = 0.08 * (1 - scroll);
      edgeMat.opacity = 0.12 * (1 - scroll);

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
      // Scale mesh to cover updated viewport (geometry stays the same)
      const { pw: npw, ph: nph } = getPlaneSize(width, height);
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

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}
