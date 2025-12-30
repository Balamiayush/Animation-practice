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
            When does a man die? When he is hit by a bullet? No! When he suffers
            a disease? No! When he ate a soup made out of a poisonous mushroom?
            No! A man dies when he is forgotten!
          </BlurText>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default CircularMotion;
