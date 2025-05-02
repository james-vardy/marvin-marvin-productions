import Image from "next/image";
import { Track } from "@/types";
import {
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeaturedWorkCard({ work }: { work: Track }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:bg-indigo-50">
      {/* ensure a perfect square cover */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={`https://edit.marvinmarvinproductions.com${work.coverImage.url}`}
          fill
          className="object-cover"
          alt={work.coverImage.alternativeText ?? "cover image"}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold">{work.trackName}</h3>
        <p className="text-sm text-gray-600">{work.artistName}</p>
        <p className="text-xs text-gray-500 mb-2">
          Released: {work.releaseDate}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          {work.description ?? "No description provided"}
        </p>
        <div className="flex space-x-4 text-2xl text-slate-600">
          {work.spotifyLink && (
            <a href={work.spotifyLink} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faSpotify} />
            </a>
          )}
          {work.appleMusicLink && (
            <a href={work.appleMusicLink} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faApple} />
            </a>
          )}
          {work.youtubeLink && (
            <a href={work.youtubeLink} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          )}
          {work.soundCloudLink && (
            <a href={work.soundCloudLink} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faSoundcloud} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
