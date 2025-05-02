import { APIResponse, Track } from "@/types";
import Image from "next/image";
import WorkCard from "./WorkCard";

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

export default async function Home() {
  const { data } = await getSelectedWorks();
  const worksWithStream = data.filter((w: Track) => !!w.streamingLink);

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {worksWithStream.map((work: Track) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
