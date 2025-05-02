import { APIResponse } from "@/types";
import WorkCard from "./FeaturedWorkCard";
import {
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import FeaturedWorkCard from "./FeaturedWorkCard";

async function getSelectedWorks() {
  const res = await fetch(
    "https://edit.marvinmarvinproductions.com/api/selected-works?populate=*&sort=releaseDate:desc"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Works() {
  const { data } = (await getSelectedWorks()) as APIResponse;
  const highlighted = data.filter((w: { highlighted: any }) => w.highlighted);

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlighted.map((work) => (
          <FeaturedWorkCard key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
