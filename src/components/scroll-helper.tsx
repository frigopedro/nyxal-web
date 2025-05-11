"use client";

import { useEffect } from "react";

export default function ScrollHelper() {
  useEffect(() => {
    // Add a small helper to show scroll indicator
    const createScrollIndicator = () => {
      const indicator = document.createElement("div");
      indicator.className =
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center animate-bounce opacity-80";

      const text = document.createElement("div");
      text.className = "text-black text-sm mb-2";
      text.textContent = "Role para baixo";

      const arrow = document.createElement("div");
      arrow.className =
        "w-6 h-6 border-b-2 border-r-2 border-black transform rotate-45";

      indicator.appendChild(text);
      indicator.appendChild(arrow);
      document.body.appendChild(indicator);

      // Remove after 8 seconds or when user scrolls
      const removeIndicator = () => {
        indicator.classList.add(
          "opacity-0",
          "transition-opacity",
          "duration-500"
        );
        setTimeout(() => {
          if (document.body.contains(indicator)) {
            document.body.removeChild(indicator);
          }
        }, 500);
      };

      window.addEventListener("scroll", removeIndicator, { once: true });
      setTimeout(removeIndicator, 8000);
    };

    // Wait a bit before showing the indicator
    setTimeout(createScrollIndicator, 1500);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return null;
}
