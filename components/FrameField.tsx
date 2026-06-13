"use client";

import { useEffect, useRef } from "react";

export default function FrameField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      frame += 0.008;
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (let i = 0; i < 34; i += 1) {
        const x = ((i * 113 + frame * 900) % (width + 260)) - 130;
        const y = (Math.sin(frame * 2 + i * 0.7) * 0.5 + 0.5) * height;
        const alpha = 0.025 + (i % 5) * 0.008;
        context.strokeStyle = `rgba(86, 255, 219, ${alpha})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 96, y - 42);
        context.lineTo(x + 174, y - 42);
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="frameField" aria-hidden="true" />;
}
