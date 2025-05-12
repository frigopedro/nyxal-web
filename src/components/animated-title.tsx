import { useEffect, useRef } from "react";
import gsap from "gsap";
export const AnimatedTitle = ({ text }: { text: string }) => {
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
                // textShadow:
                //   "0 0 8px rgba(44,16,96,0.4), 0 0 15px rgba(75,32,139,0.)",
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
