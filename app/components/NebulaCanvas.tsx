"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  orb: boolean;
};

export default function NebulaCanvas({ tint = "violet" }: { tint?: "violet" | "blue" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];

    const SMALL_COUNT = 42;
    const ORB_COUNT = 5;
    const LINK_DIST = 150;

    const line = tint === "blue" ? "120,170,255" : "170,140,255";
    const orbColor = tint === "blue" ? "135,181,255" : "180,130,255";
    const dot = tint === "blue" ? "224,236,255" : "232,222,255";

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      nodes = [];
      for (let i = 0; i < SMALL_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.4 + Math.random() * 1.4,
          orb: false,
        });
      }
      for (let i = 0; i < ORB_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 20 + Math.random() * 26,
          orb: true,
        });
      }
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = width + 40;
        if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40;
        if (n.y > height + 40) n.y = -40;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = a.orb || b.orb ? LINK_DIST * 1.6 : LINK_DIST;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx!.strokeStyle = `rgba(${line},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      nodes
        .filter((n) => n.orb)
        .forEach((n) => {
          const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
          grad.addColorStop(0, `rgba(${orbColor},0.45)`);
          grad.addColorStop(1, `rgba(${orbColor},0)`);
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx!.fill();
        });

      nodes
        .filter((n) => !n.orb)
        .forEach((n) => {
          ctx!.fillStyle = `rgba(${dot},0.85)`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx!.fill();
        });

      raf = requestAnimationFrame(step);
    }

    resize();
    makeNodes();
    step();

    const onResize = () => {
      resize();
      makeNodes();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [tint]);

  return <canvas ref={canvasRef} className="nebula-canvas" aria-hidden="true" />;
}
