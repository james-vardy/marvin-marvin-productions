import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  return (
    <nav className="">
      <div className="flex py-4 flex-col justify-center items-center lg:flex-row lg:py-8">
        <div className="justify-between items-center flex py-4">
          <h1 className="text-6xl text-center lg:text-left">
            <Link href={"/"}>Evan J. Martin Productions</Link>
          </h1>
        </div>

        <div className="flex items-center py-4">
          <div className="flex text-lg lg:text-2xl lg:mx-24">
            <Link href={"/works"} className="px-2 lg:px-5">
              Works
            </Link>
            <Link
              href={"mailto:evanjmartinproductions@gmail.com"}
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
