import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
  {
    name: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    name: "Apple",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
  },
  {
    name: "Coca-Cola",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800",
  },
  {
    name: "Amazon",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800",
  },
];

const KeyClients = () => {
  const sectionRef = useRef(null);
  const textWrapRef = useRef(null);
  const imageRefs = useRef([]);

useGSAP(() => {
  const texts = gsap.utils.toArray(".client-text");
  const images = imageRefs.current;

  // Initial state
  gsap.set(texts, { y: 100, opacity: 0 });
  gsap.set(images, { opacity: 0, scale: 1.1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${clients.length * 100}%`,
      scrub: true,
      pin: true,
    },
  });

  texts.forEach((text, i) => {
    const img = images[i];
    const prevText = texts[i - 1];
    const prevImg = images[i - 1];

    // TEXT + IMAGE IN (CENTER)
    tl.to(
      text,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      i
    ).to(
      img,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "<"
    );

    // TEXT + IMAGE OUT
    if (prevText && prevImg) {
      tl.to(
        prevText,
        {
          y: -100,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        },
        "<"
      ).to(
        prevImg,
        {
          opacity: 0,
          scale: 1.1,
          duration: 0.6,
          ease: "power3.in",
        },
        "<"
      );
    }
  });
}, []);


  return (
    <>
      <div className="h-screen bg-black" />

      <section
        ref={sectionRef}
        className="h-screen bg-[#101010] overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
          {/* IMAGE */}
          <div className="relative w-[420px] h-[420px] rounded-2xl overflow-hidden">
            {clients.map((client, i) => (
              <img
                key={i}
                ref={(el) => (imageRefs.current[i] = el)}
                src={client.image}
                alt={client.name}
                className="absolute inset-0 w-full h-full object-cover  scale-110"
              />
            ))}
          </div>

          {/* TEXT */}
      
         
          {/* TEXT */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  {clients.map((client, i) => (
    <h1
      key={i}
      className="client-text absolute text-[4vw] uppercase font-bold text-white mix-blend-difference"
    >
      {client.name}
    </h1>
  ))}
</div>

        </div>
      </section>
    </>
  );
};

export default KeyClients;
