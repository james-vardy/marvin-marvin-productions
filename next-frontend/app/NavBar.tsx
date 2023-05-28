"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

async function getProfessionalDetails() {
  const res = await fetch(
    "https://edit.marvinmarvinproductions.com/api/professional-detail?populate=*"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function NavBar() {
  const [click, setClick] = useState(false);
  const changeClick = () => setClick(!click);

  // const [instagramLink, setInstagramLink] = useState("blank");
  // const professionalDetails: professionalDetails =
  //   await getProfessionalDetails();
  // setInstagramLink(professionalDetails.data.attributes.instagramLink);

  return (
    <nav>
      <div className="flex justify-between py-4">
        <div className="justify-between items-center mx-4 my-4 flex md:justify-center ">
          <div className="">
            <h1 className="text-2xl md:text-4xl text-left">
              <Link href={"/"} className="capitalize">
                MarvinMarvin Productions
              </Link>
            </h1>
          </div>
        </div>

        <div className="flex items-center mx-4 my-4">
          <div className="flex text-xl lg:mx-24">
            <Link href={"/works"} className="px-2 md:px-5 hidden md:block">
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
