"use client";
import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 28;
const MAX_WIDTH = 2.5;    // px at newest point
const MAX_OPACITY = 0.6;  // at newest point
const DISSOLVE_MS = 500;  // ms to fully fade after cursor stops
const COLOR = "168,216,234"; // #A8D8EA as rgb

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Trail: ordered oldest → newest
    const trail: { x: number; y: number }[] = [];
    let lastMoveTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // If cursor was idle, start fresh so it doesn't snap from old position
      if (lastMoveTime > 0 && now - lastMoveTime > 150) {
        trail.length = 0;
      }
      lastMoveTime = now;
      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > TRAIL_LENGTH) trail.shift();
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameId: number;

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length < 2) return;

      const elapsed = Date.now() - lastMoveTime;
      const dissolve = lastMoveTime === 0
        ? 0
        : Math.max(0, 1 - elapsed / DISSOLVE_MS);

      if (dissolve === 0) return;

      // Draw each segment with increasing width and opacity tail→head
      const n = trail.length;
      for (let i = 1; i < n; i++) {
        const t = i / n; // 0 at oldest end, ~1 at newest
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(${COLOR},${t * MAX_OPACITY * dissolve})`;
        ctx.lineWidth = t * MAX_WIDTH;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
