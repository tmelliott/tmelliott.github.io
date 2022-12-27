import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

type Circle = {
  x: number;
  y: number;
  radius: number;
  color: string;
};

const TIMEOUT = 30;

export default function MovingCircles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // get dimensions of container
    const { width, height } = containerRef.current.getBoundingClientRect();
    console.log(width, height);

    for (let i = 0; i < 10; i++) {
      const circle = {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100,
        color: `rgba(255, 255, 255, ${Math.random() / 4})`,
      };

      setCircles((prev) => [...prev, circle]);
    }

    return () => setCircles([]);
  }, [setCircles]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setCircles((prev) => {
        return prev.map((circle) => {
          const { x, y, radius, color } = circle;

          // reflect new values off the edges of the containe
          const rx = x + (Math.random() * height) / 2 - height / 4;
          const ry = y + (Math.random() * height) / 2 - height / 4;
          const newX = rx < 0 ? 0 : rx > width ? width : rx;
          const newY = ry < 0 ? 0 : ry > height ? height : ry;

          return {
            x: newX,
            y: newY,
            radius,
            color: `rgba(255, 255, 255, ${Math.random() / 4})`,
          };
        });
      });
    }, TIMEOUT * 1000);

    return () => clearInterval(interval);
  }, [circles]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex items-center justify-center"
    >
      <svg className="absolute h-full w-full z-50">
        {circles.map((circle, i) => (
          <motion.circle
            key={i}
            // cx={circle.x}
            // cy={circle.y}
            // r={circle.radius}
            // fill={circle.color}
            animate={{
              cx: circle.x,
              cy: circle.y,
              r: circle.radius,
              fill: circle.color,
              transition: {
                duration: TIMEOUT,
                ease: "linear",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
