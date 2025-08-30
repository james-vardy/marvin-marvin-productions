import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex py-4 flex-col justify-center items-center lg:flex-row lg:py-6 max-w-7xl mx-auto px-4">
        <div className="justify-between items-center flex py-4">
          <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold">
            <Link href={"/"}>Evan J. Martin Productions</Link>
          </h1>
        </div>

        <div className="flex items-center py-4">
          <div className="flex text-lg lg:text-xl lg:mx-12 items-center">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="px-4 lg:px-6 hover:text-blue-600 transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="px-4 lg:px-6 hover:text-blue-600 transition-colors"
            >
              Featured
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="px-4 lg:px-6 hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <Link
              href={"mailto:evanjmartinproductions@gmail.com"}
              className="px-4 lg:px-6 hover:text-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            </Link>
            <Link
              href={"https://www.instagram.com/evanjmartinproductions/"}
              className="px-4 lg:px-6 hover:text-blue-600 transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
