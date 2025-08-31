"use client";

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCalendarAlt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import pb from "@/src/lib/pocketbase";
import PlayButton from "@/src/components/PlayButton";

interface WorkCardProps {
  work: Track;
  showDescription?: boolean;
  showExpandableDescription?: boolean;
}

export default function WorkCard({
  work,
  showDescription = false,
  showExpandableDescription = false,
}: WorkCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder-cover.svg");
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function loadImage() {
      try {
        if (work.coverImage) {
          const pbImageUrl = pb.getFileUrl(work, work.coverImage);
          setImageUrl(pbImageUrl);
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImage();
  }, [work.coverImage]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const hasAudio = work.trackFile || work.streamingFile || work.previewFile;
  const maxLength = 150;
  const shouldTruncate =
    showExpandableDescription &&
    work.description &&
    work.description.length > maxLength;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Album Artwork */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Image
            src={imageUrl}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            alt={`${work.trackName} cover`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}

        {hasAudio && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
              <PlayButton track={work} size="lg" />
            </div>
          </div>
        )}
      </div>

      {/* Track Information */}
      <div className="p-4 space-y-3">
        {/* Title and Artist */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
            {work.trackName}
          </h3>
          <p className="text-gray-600 font-medium">{work.artistName}</p>
        </div>

        {/* Release Date */}
        {work.releaseDate && (
          <div className="flex items-center text-sm text-gray-500">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="mr-2 text-gray-400"
            />
            {formatDate(work.releaseDate)}
          </div>
        )}

        {/* Evan's Role */}
        {work.evanRole && (
          <div className="flex items-center text-sm text-blue-600">
            <FontAwesomeIcon icon={faMusic} className="mr-2" />
            {work.evanRole}
          </div>
        )}

        {/* Description - Expandable or Static */}
        {work.description && (showDescription || showExpandableDescription) && (
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {shouldTruncate && !isExpanded
                ? `${work.description.substring(0, maxLength)}...`
                : work.description}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-black hover:text-gray-600 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                {isExpanded ? "Show less" : "Read more"}
                <FontAwesomeIcon
                  icon={isExpanded ? faChevronUp : faChevronDown}
                  className="text-xs"
                />
              </button>
            )}
          </div>
        )}

        {/* Streaming Platform Links */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex space-x-3">
            {work.spotifyLink && (
              <a
                href={work.spotifyLink}
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors"
                title="Listen on Spotify"
              >
                <FontAwesomeIcon icon={faSpotify} size="lg" />
              </a>
            )}
            {work.appleMusicLink && (
              <a
                href={work.appleMusicLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 hover:text-black transition-colors"
                title="Listen on Apple Music"
              >
                <FontAwesomeIcon icon={faApple} size="lg" />
              </a>
            )}
            {work.youtubeLink && (
              <a
                href={work.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Watch on YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            )}
            {work.soundCloudLink && (
              <a
                href={work.soundCloudLink}
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 hover:text-orange-600 transition-colors"
                title="Listen on SoundCloud"
              >
                <FontAwesomeIcon icon={faSoundcloud} size="lg" />
              </a>
            )}
          </div>

          {work.highlighted && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
