"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollHelper from "@/components/scroll-helper";

gsap.registerPlugin(ScrollTrigger);
const AnimatedText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(".word");

    if (words && words.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom+=1% 70%", // Adjust scroll range
          scrub: 1,
        },
      });

      words.forEach((word, index) => {
        tl.fromTo(
          word,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          index * 0.1 // delay between words in timeline
        );
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden flex flex-wrap justify-center min-h-[200vh] "
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="word inline-block mr-2 whitespace-nowrap">
          {word}
        </span>
      ))}
    </div>
  );
};

const AnimatedTitle = ({ text }: { text: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reflectionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll(".letter");

    // Disable scroll on mount
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (letters && letters.length > 0 && reflectionRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // Re-enable scroll when animation is done
          document.body.style.overflow = originalOverflow;
        },
      });

      tl.set(letters, { opacity: 0, y: 50, scale: 0.95 });

      tl.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });

      tl.fromTo(
        reflectionRef.current,
        { opacity: 0, y: -10 },
        { opacity: 0.3, y: 0, duration: 1, ease: "power2.out" },
        "-=0.4"
      );
    }

    // Fallback in case animation is skipped/interrupted
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="relative text-center mb-16">
      {/* Glowing Title */}
      <h1
        ref={titleRef}
        className="text-[#2c1056] text-6xl md:text-8xl font-bold tracking-tighter main-title z-10 relative"
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="letter inline-block"
            style={
              {
                // textShadow: "0 0 8px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)",
              }
            }
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <h1
        ref={reflectionRef}
        className="absolute left-0 right-0 top-full mt-2 transform scale-y-[-1] text-[#250D4A] text-6xl md:text-8xl font-bold tracking-tighter blur-sm opacity-0 pointer-events-none"
      >
        {text}
      </h1>
    </div>
  );
};
export default function Home() {
  return (
    <div className="">
      {/* <div className="fixed inset-0 bg-gradient-to-br from-black via-[#1a0033] to-[#2d0066] z-0"> */}
      {/* <Particles className="absolute inset-0" quantity={200} /> */}
      {/* </div> */}
      <div className="z-1">
        <div className="h-[40vh]" />
        <AnimatedTitle text="Nyxal" />
        <div className="mx-auto sm:w-5/6  md:w-3/4">
          <h1 className="main-title text-6xl md:text-8xl font-bold tracking-tighter text-center mb-8 text-[#2c1056] opacity-80">
            <AnimatedText text="Onde muitos enxergam software, nós vemos legado. Somos engenheiros movidos pela inovação, esculpimos soluções sob medida com a minúcia de quem protege sua assinatura, transformando grandes ambições em jornadas digitais perfeitas." />
          </h1>
        </div>

        <ScrollHelper />
      </div>

      <div className="h-[40vh]"></div>
    </div>
  );
}
