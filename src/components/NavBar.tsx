"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="flex justify-between items-center py-3 max-w-7xl mx-auto px-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">
            <Link href={"/"}>Evan J. Martin Productions</Link>
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("featured")}
            className="hover:text-gray-600 transition-colors text-black font-medium text-sm lg:text-base"
          >
            Featured
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="hover:text-gray-600 transition-colors text-black font-medium text-sm lg:text-base"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-gray-600 transition-colors text-black font-medium text-sm lg:text-base"
          >
            Contact
          </button>
          <Link
            href={"https://www.instagram.com/evanjmartinproductions/"}
            className="hover:text-gray-600 transition-colors text-black"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
