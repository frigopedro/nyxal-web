"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollHelper from "@/components/scroll-helper";
import { AnimatedTitle } from "@/components/animated-title";
import { AnimatedText } from "@/components/animated-text";
import Header from "@/components/header";
import { useEffect, useRef } from "react";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionsRef.current) {
      // Animate sections on scroll
      const sections = sectionsRef.current.querySelectorAll("section");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, []);
  return (
    <div className="bg-gradient-to-b from-[#fbfafb] to-white min-h-screen">
      <Header />
      <div className="z-1">
        <div className="h-[40vh]" />
        <AnimatedTitle text="Nyxal" />
        <div className="mx-auto sm:w-5/6 md:w-3/4 lg:w-3/6">
          <h1 className="main-title text-6xl md:text-8xl font-bold text-center mb-8 text-[#2c1056] opacity-80">
            <AnimatedText text="Onde muitos enxergam software, nós vemos legado. Somos engenheiros movidos pela inovação, esculpimos soluções sob medida com a minúcia de quem protege sua assinatura, transformando grandes ambições em jornadas digitais perfeitas." />
          </h1>
        </div>
      </div>
      <div className="h-[40vh]"></div>
      d
      <ScrollHelper />
      <Footer />
    </div>
  );
}
