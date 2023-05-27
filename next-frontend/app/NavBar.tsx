"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

async function getProfessionalDetails() {
  const res = await fetch(
    "http://localhost:1337/api/professional-detail?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NavBar() {
  const [click, setClick] = useState(false);
  const changeClick = () => setClick(!click);

  const professionalDetails: professionalDetails =
    await getProfessionalDetails();

  return (
    <nav>
      <div className="grid">
        <div className="row-auto">
          <div className="justify-between items-center px-8 py-8 mx-4 my-4 flex md:justify-center ">
            <div className="px-2">
              <h1 className="text-2xl md:text-4xl">
                <Link href={"/"} className="capitalize">
                  MarvinMarvin Productions
                </Link>
              </h1>
            </div>

            <div className="justify-end px-2 md:hidden hover:cursor-pointer">
              <FontAwesomeIcon
                onClick={changeClick}
                icon={click ? faTimes : faBars}
                size="2x"
              ></FontAwesomeIcon>
            </div>

            <div className="hidden px-2 md:flex text-xl lg:mx-24">
              <Link href={"/works"} className="px-4 py-4">
                Works
              </Link>
              <Link href={"/contact"} className="px-4 py-4">
                Contact
              </Link>
              <Link
                href={professionalDetails.data.attributes.instagramLink}
                className="px-4 py-4"
                target="_blank"
              >
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
