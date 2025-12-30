import React, { useRef } from "react";
import LayoutWrapper from "../utils/LayoutWrapper";
import BlurText from "./Animation/Blurtext";

const CircularMotion = () => {
  const scrollContainerRef = useRef(null);
  return (
    <section className="w-full h-screen bg-[#101010] flex items-center justify-center ">
      <LayoutWrapper>
        <div className="">
          <BlurText baseRotation={0} scrollContainerRef={scrollContainerRef}>
            Prixa is the Intelligent leyer <br />
            that optimize processes, reduces costs<br />
            and enhances productivity.
          </BlurText>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default CircularMotion;
