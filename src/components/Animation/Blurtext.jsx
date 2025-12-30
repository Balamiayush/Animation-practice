import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Circlesvg from "../../assets/icon/Circlesvg";

gsap.registerPlugin(ScrollTrigger);

const BlurText = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // 🔹 Split text into words
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    const scroller =
      scrollContainerRef?.current || window;

    // 🔹 Rotate container slightly
    gsap.fromTo(
      el,
      { rotate: baseRotation, transformOrigin: "0% 50%" },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const words = el.querySelectorAll(".word");

    // 🔹 Word opacity animation
    gsap.fromTo(
      words,
      { opacity: baseOpacity },
      {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    // 🔹 Blur animation
    if (enableBlur) {
      gsap.fromTo(
        words,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=40%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    // 🔹 TEXT SIZE INCREASE (+20px)
    const baseFontSize = parseFloat(
      window.getComputedStyle(textEl).fontSize
    );

    gsap.fromTo(
      textEl,
      { fontSize: baseFontSize },
      {
        scale:1.08,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center"
    >
      <Circlesvg className="absolute circlesvg" />

      <div
        className={`flex items-center justify-center w-1/3 ${containerClassName}`}
      >
        <p
          ref={textRef}
          className={`text-center leading-none font-semibold ${textClassName}`}
        >
          {splitText}
        </p>
      </div>
    </div>
  );
};

export default BlurText;
