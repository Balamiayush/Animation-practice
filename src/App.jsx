"use client";

import useLenis from "./utils/Lenis";
import HeroSection from "./components/HeroSection";
import Works from "./components/Works";
import OurLife from "./components/OurLife";
import MajorServices from "./components/MajorServices";
import KeyClients from "./components/KeyClients";
import CircularMotion from "./components/CircularMotion";


const App = () => {
  useLenis();

  return (
    <main className="w-full relative bg-[#101010]">
    <HeroSection />
    <Works/>
    <OurLife/>
    <MajorServices/>
    <KeyClients/>
    <CircularMotion/>
    <div className="page2 w-full h-screen"></div>
    </main>
  );
};

export default App;
