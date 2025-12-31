import { useState } from "react";
import BlurText from "./Animation/Blurtext";
import Circlesvg from "../assets/icon/Circlesvg";

const highlightMap = {
  "high-level": [3, 4],
  "visionary": [8, 9],
  "operational": [0],
  "granular": [11, 12]
};

export default function CircularMotion() {
  const [activeLabel, setActiveLabel] = useState(null);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      <Circlesvg
        onHover={setActiveLabel}
        className="absolute w-[120%]"
      />

      <BlurText
        text="Prixa is the Intelligent leyer that optimize processes, reduces costs and enhances productivity."
        highlightMap={highlightMap}
        activeLabel={activeLabel}
        enableScroll={true}
        className="w-1/3"
      />
    </div>
  );
}
