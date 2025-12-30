import React, { useRef } from "react";
import LayoutWrapper from "../utils/LayoutWrapper";
import gsap from "gsap";

const MajorServices = () => {
  const itemsRef = useRef([]);
  const data = [
    {
      img: "https://images.unsplash.com/photo-1766059965561-e0e2a892031a",
      title: "Service One",
    },
    {
      img: "https://images.unsplash.com/photo-1766858667597-a9ba9d49473a",
      title: "Service Two",
    },
    {
      img: "https://images.unsplash.com/photo-1766750085941-8dc778053637",
      title: "Service Three",
    },
  ];

  const onEnter = (i) => {
    gsap.to(itemsRef.current[i], {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      
      ease: "power4.out",
    });
  };

  const onLeave = (i) => {
    gsap.to(itemsRef.current[i], {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    
      ease: "linear",
    });
  };

  return (
    <section className="w-full min-h-screen bg-[#101010] py-20 overflow-hidden">
      <LayoutWrapper>
        <h3 className="text-[5vw] text-white mb-20 uppercase font-semibold">
          Major Services
        </h3>
      </LayoutWrapper>

      <div className="flex">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
            className="relative w-1/3 h-[90vh] border border-zinc-800 overflow-hidden hover:w-[80vw] transition-all duration-300"
          >
            <img
              ref={(el) => (itemsRef.current[i] = el)}
              src={`https://picsum.photos/1200/800?random=${i}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MajorServices;
