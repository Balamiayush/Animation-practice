import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Circlesvg = ({ onHover, ...props }) => {
  const container = useRef();

  useGSAP(() => {
    const groups = gsap.utils.toArray(".interactive-group");

    groups.forEach((group) => {
      const dot = group.querySelector(".dot");
      const text = group.querySelector(".text");
      const arc = group.querySelector(".arc");
      const label = group.getAttribute("data-label");

      const tl = gsap.timeline({ paused: true });

      tl.to(dot, { opacity: 0, duration: 0.3 })
        .to(arc, { strokeOpacity: 1, duration: 0.3 }, 0)
        .to(text, { fill: "#ffffff", duration: 0.3 }, 0);

      group.addEventListener("mouseenter", () => {
        tl.play();
        if (onHover) onHover(label); // Tell parent which section is hovered
      });

      group.addEventListener("mouseleave", () => {
        tl.reverse();
        if (onHover) onHover(null); // Reset
      });
    });
  }, { scope: container });

  return (
    <svg ref={container} {...props} viewBox="0 0 1536 706">
      {/* High Level (Top) */}
      <g className="interactive-group" data-label="high-level" style={{ cursor: "pointer" }}>
        <path fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" d="M596.851 135.899a276.45 276.45 0 0 1 342.298 0" className="arc" />
        <circle className="dot" cx="768" cy="111.55" r="5" fill="#fff" fillOpacity="0.5" />
        <text className="text" fill="rgba(255,255,255,0.5)" fontSize="24px" textAnchor="middle" transform="translate(768 56.75)">High Level</text>
      </g>

      {/* Visionary (Right) */}
      <g className="interactive-group" data-label="visionary" style={{ cursor: "pointer" }}>
        <path fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" d="M985.101 181.851a276.45 276.45 0 0 1 0 342.298" className="arc" />
        <circle className="dot" cx="1009.45" cy="353" r="5" fill="#fff" fillOpacity="0.5" />
        <text className="text" fill="rgba(255,255,255,0.5)" fontSize="24px" textAnchor="middle" transform="rotate(90 355.625 708.625)">Visionary</text>
      </g>

      {/* Granular (Bottom) */}
      <g className="interactive-group" data-label="granular" style={{ cursor: "pointer" }}>
        <path fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" d="M939.149 570.101a276.45 276.45 0 0 1-342.298 0" className="arc" />
        <circle className="dot" cx="768" cy="594.45" r="5" fill="#fff" fillOpacity="0.5" />
        <text className="text" fill="rgba(255,255,255,0.5)" fontSize="24px" textAnchor="middle" transform="translate(768 659.25)">Granular</text>
      </g>

      {/* Operational (Left) */}
      <g className="interactive-group" data-label="operational" style={{ cursor: "pointer" }}>
        <path fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" d="M550.899 524.149a276.45 276.45 0 0 1 0-342.298" className="arc" />
        <circle className="dot" cx="526.55" cy="353" r="5" fill="#fff" fillOpacity="0.5" />
        <text className="text" fill="rgba(255,255,255,0.5)" fontSize="24px" textAnchor="middle" transform="rotate(-90 412.375 -59.375)">Operational</text>
      </g>
    </svg>
  );
};

export default React.memo(Circlesvg);