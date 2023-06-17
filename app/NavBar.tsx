import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  return (
    <nav className="">
      <div className="flex py-4 flex-col justify-center items-center md:flex-row md:py-8">
        <div className="justify-between items-center flex py-4">
          <h1 className="text-2xl text-center md:text-4xl md:text-left">
            <Link href={"/"}>MarvinMarvin Productions</Link>
          </h1>
        </div>

        <div className="flex items-center py-4">
          <div className="flex text-xl lg:mx-24">
            <Link href={"/works"} className="px-2 md:px-5">
              Works
            </Link>
            <Link
              href={"mailto:marvinmarvinproductions@gmail.com"}
              className="px-5"
            >
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            </Link>
            <Link
              href={"https://www.instagram.com/marvinmarvinproductions/"}
              className="px-5"
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
