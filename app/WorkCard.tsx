import Image from "next/image";
import { Track } from "@/types";

export default function WorkCard({ work }: { work: Track }) {
  return (
    <a
      href={work.streamingLink}
      target="_blank"
      rel="noreferrer"
      className="block bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:bg-indigo-50"
    >
      {/* ensure a perfect square cover */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={`https://edit.marvinmarvinproductions.com${work.coverImage.url}`}
          fill
          className="object-cover"
          alt={work.coverImage.alternativeText ?? "cover image"}
        />
      </div>
      <div className="p-4 text-center">
        <p className="text-sm text-gray-700">{work.evanRole}</p>
      </div>
    </a>
  );
}
