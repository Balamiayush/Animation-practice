import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lerp = (a, b, n) => (1 - n) * a + n * b;

const BlurText = ({
  text,
  highlightMap,
  activeLabel,          // external hover control (SVG)
  enableScroll = true,  // ScrollTrigger on/off
  className = ""
}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  /* -------------------------------
     🔥 Hover / External Highlight
  -------------------------------- */
  useEffect(() => {
    const words = wordsRef.current;

    if (activeLabel && highlightMap[activeLabel]) {
      const targets = highlightMap[activeLabel];

      words.forEach((word, i) => {
        const isTarget = targets.includes(i);

        gsap.to(word, {
          opacity: isTarget ? 1 : 0.2,
          filter: isTarget ? "blur(0px)" : "blur(4px)",
          y: isTarget ? -4 : 0,
          fontWeight: isTarget ? 500 : 300,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    } else {
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        fontWeight: 300,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [activeLabel, highlightMap]);

  /* -------------------------------
     🧲 Magnetic / Lerp Motion
  -------------------------------- */
  useEffect(() => {
    const container = containerRef.current;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - rect.width / 2;
      mouse.current.y = e.clientY - rect.top - rect.height / 2;
    };

    container.addEventListener("mousemove", onMove);

    gsap.ticker.add(() => {
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.08);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.08);

      gsap.set(container, {
        x: smooth.current.x * 0.02,
        y: smooth.current.y * 0.02
      });
    });

    return () => {
      container.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(() => {});
    };
  }, []);

  /* -------------------------------
     📜 ScrollTrigger Sync
  -------------------------------- */
  useEffect(() => {
    if (!enableScroll) return;

    const words = wordsRef.current;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const index = Math.floor(self.progress * words.length);

        words.forEach((word, i) => {
          const isActive = i === index;

          gsap.to(word, {
            opacity: isActive ? 1 : 0.25,
            filter: isActive ? "blur(0px)" : "blur(4px)",
            y: isActive ? -4 : 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, [enableScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative z-20 text-center ${className}`}
    >
      <p className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[26px] font-light text-white leading-relaxed">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="inline-block will-change-transform"
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

export default BlurText;
