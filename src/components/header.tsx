"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0"
      }`}
    >
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#2c1056]">
              Nyxal
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Serviços
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Sobre
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Resultados
              </Link>
              <Button className="bg-[#2c1056] hover:bg-[#4a2a7b] text-white">
                Contate-nos
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#2c1056]" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col space-y-4">
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Serviços
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Sobre
              </Link>
              <Link
                href="#"
                className="text-[#2c1056] hover:text-[#4a2a7b] font-medium"
              >
                Resultados
              </Link>
              <Button className="bg-[#2c1056] hover:bg-[#4a2a7b] text-white w-full">
                Contate-nos
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
