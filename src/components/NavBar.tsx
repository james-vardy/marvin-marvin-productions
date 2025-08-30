import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6">
          {/* Logo/Brand */}
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <Link href={"/"}>Evan J. Martin Productions</Link>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Music Producer & Audio Engineer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-6">
            <Link
              href={"/works"}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Featured Works
            </Link>

            {/* Social Links */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
              <Link
                href={"mailto:evanjmartinproductions@gmail.com"}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-50 rounded-full"
                title="Contact via Email"
              >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </Link>
              <Link
                href={"https://www.instagram.com/evanjmartinproductions/"}
                className="text-gray-500 hover:text-pink-500 transition-colors p-2 hover:bg-gray-50 rounded-full"
                target="_blank"
                title="Follow on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
