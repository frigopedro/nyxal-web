import { useEffect, useRef } from "react";
import gsap from "gsap";

export const AnimatedText = ({ text }: { text: string }) => {
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
