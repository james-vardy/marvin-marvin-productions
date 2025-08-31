"use client";

import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-black">
              <Link href={"/"}>Evan J. Martin Productions</Link>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-4">
              <button
                onClick={() => scrollToSection("featured")}
                className="block w-full text-left px-4 py-2 text-black font-medium hover:bg-gray-50 transition-colors"
              >
                Featured
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block w-full text-left px-4 py-2 text-black font-medium hover:bg-gray-50 transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-black font-medium hover:bg-gray-50 transition-colors"
              >
                Contact
              </button>
              <div className="px-4 py-2">
                <Link
                  href={"https://www.instagram.com/evanjmartinproductions/"}
                  className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-lg mr-2"
                  />
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
