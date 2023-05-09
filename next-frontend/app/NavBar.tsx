"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const changeClick = () => setClick(!click);

  return (
    <nav>
      <div className="grid">
        <div className="row-auto">
          <div className="justify-between items-center px-12 py-12 flex md:justify-center ">
            <div className="px-2">
              <h1 className="text-2xl md:text-4xl">
                <Link href={"/"}>MarvinMarvin Productions</Link>
              </h1>
            </div>

            <div className="justify-end px-2 md:hidden hover:cursor-pointer">
              <FontAwesomeIcon
                onClick={changeClick}
                icon={click ? faTimes : faBars}
                size="2x"
              ></FontAwesomeIcon>
            </div>

            <div className="hidden px-2 md:flex text-xl">
              <Link href={"/works"} className="px-4 py-4">
                Works
              </Link>
              <Link href={"/contact"} className="px-4 py-4">
                Contact
              </Link>
              <Link href={"https://www.instagram.com"} className="px-4 py-4">
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </Link>
            </div>
          </div>

          <div className={click ? "grid md:hidden justify-center" : "hidden"}>
            <Link
              href={"/works"}
              className="inline-block align-middle text-center px-8 py-8"
            >
              Works
            </Link>
            <Link
              href={"/contact"}
              className="inline-block align-middle text-center px-8 py-8"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
