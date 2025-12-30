import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Circlesvg from "../../assets/icon/Circlesvg";

const BlurText = () => {
  const containerRef = useRef(null);
  const [activeLabel, setActiveLabel] = useState(null);

  // Define which words belong to which hover state
  const highlightMap = {
    "high-level": [3, 4],       // "Intelligent", "leyer"
    "visionary": [8, 9],        // "reduces", "costs"
    "operational": [0],         // "Prixa"
    "granular": [11, 12]        // "enhances", "productivity"
  };

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".word");
    
    if (activeLabel && highlightMap[activeLabel]) {
      const targets = highlightMap[activeLabel];
      
      words.forEach((word, index) => {
        const isTarget = targets.includes(index);
        gsap.to(word, {
          opacity: isTarget ? 1 : 0.2,
          filter: isTarget ? "blur(0px)" : "blur(4px)",
          scale: isTarget ? 1.1 : 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    } else {
      // Reset everything when not hovering
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [activeLabel]);

  const textContent = "Prixa is the Intelligent leyer that optimize processes, reduces costs and enhances productivity.";

  return (
    <div ref={containerRef} className="relative  w-full h-screen flex items-center justify-center overflow-hidden">
      {/* SVG Layer */}
      <Circlesvg 
        onHover={setActiveLabel} 
        className="absolute w-[120%]   " 
      />

      {/* Text Layer */}
      <div className="z-20 w-1/3 text-center pointer-events-none">
        <p className="text-[26px] font-light text-white leading-relaxed flex flex-wrap justify-center">
          {textContent.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mx-1 transition-colors">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BlurText;