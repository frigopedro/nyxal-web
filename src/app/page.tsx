"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollHelper from "@/components/scroll-helper";
import { AnimatedTitle } from "@/components/animated-title";
import { AnimatedText } from "@/components/animated-text";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div className="">
      <div className="z-1">
        <div className="h-[40vh]" />
        <AnimatedTitle text="Nyxal" />
        <div className="mx-auto sm:w-5/6  md:w-3/4">
          <h1 className="main-title text-6xl md:text-8xl font-bold tracking-tighter text-center mb-8 text-[#2c1056] opacity-80">
            <AnimatedText text="Onde muitos enxergam software, nós vemos legado. Somos engenheiros movidos pela inovação, esculpimos soluções sob medida com a minúcia de quem protege sua assinatura, transformando grandes ambições em jornadas digitais perfeitas." />
          </h1>
        </div>
      </div>

      <div className="h-[40vh]"></div>

      <ScrollHelper />
    </div>
  );
}
