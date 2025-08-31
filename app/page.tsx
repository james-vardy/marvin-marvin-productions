"use client";

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
import WorkCard from "@/src/components/WorkCard";
import { getSelectedWorks } from "@/src/lib/pocketbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faMusic,
  faMicrophone,
  faGuitar,
  faChevronDown,
  faChevronUp,
  faPlay,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import pb from "@/src/lib/pocketbase";
import StreamingAudioPlayer from "@/src/components/StreamingAudioPlayer";
import NewWorkCard from "@/src/components/NewWorkCard";

// Enhanced WorkCard component with expandable descriptions for featured works
function FeaturedWorkCard({ work }: { work: Track }) {
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
    work.description && work.description.length > maxLength;

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
            <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-gray-800 text-2xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Streaming Audio Player */}
      {hasAudio && <StreamingAudioPlayer track={work} />}

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

        {/* Description - Expandable */}
        {work.description && (
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

// Component for portfolio cards without descriptions
function PortfolioWorkCard({ work }: { work: Track }) {
  const [imageUrl, setImageUrl] = useState<string>("/placeholder-cover.svg");
  const [isLoading, setIsLoading] = useState(true);

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
            <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100">
              <FontAwesomeIcon
                icon={faPlay}
                className="text-gray-800 text-2xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Streaming Audio Player */}
      {hasAudio && <StreamingAudioPlayer track={work} />}

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

        {/* No description shown for portfolio cards */}

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

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const fetchedTracks = await getSelectedWorks();
        setTracks(fetchedTracks);
      } catch (err) {
        console.error("Failed to fetch from PocketBase:", err);
        setError("Failed to load tracks. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  // Filter tracks that have streaming links and sort by release date (newest first)
  const worksWithStream = tracks
    .filter(
      (w: Track) =>
        w.spotifyLink || w.appleMusicLink || w.youtubeLink || w.soundCloudLink
    )
    .sort((a: Track, b: Track) => {
      // Handle cases where releaseDate might be undefined or invalid
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;

      // Sort newest to oldest (descending order)
      return dateB - dateA;
    });

  // Filter featured works
  const featuredWorks = tracks.filter((w: Track) => w.highlighted);

  if (loading) {
    return (
      <main className="p-4 max-w-7xl mx-auto bg-white min-h-screen">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Loading Portfolio...
          </h2>
          <p className="text-gray-600">Fetching tracks from database...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 max-w-7xl mx-auto bg-white min-h-screen">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-red-700">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Featured Works Section */}
      {featuredWorks.length > 0 && (
        <section id="featured" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Featured Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredWorks.map((work: Track) => (
                <NewWorkCard
                  key={work.id}
                  work={work}
                  showExpandableDescription={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Complete Portfolio Section */}
      <section id="portfolio" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Complete Portfolio
            </h2>
          </div>

          {worksWithStream.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4 text-black">
                No Tracks Available
              </h3>
              <p className="text-gray-600">
                {tracks.length === 0
                  ? "No tracks found in the database."
                  : "No tracks with streaming links available."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {worksWithStream.map((work: Track) => (
                  <NewWorkCard key={work.id} work={work} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-gray-600">
                  Showing {worksWithStream.length} track
                  {worksWithStream.length !== 1 ? "s" : ""} out of{" "}
                  {tracks.length} total
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Contact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch to discuss your project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <FontAwesomeIcon
                icon={faMusic}
                className="text-4xl text-black mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                Music Production
              </h3>
              <p className="text-gray-600">
                Full track production from concept to final master
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-4xl text-black mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                Recording & Mixing
              </h3>
              <p className="text-gray-600">
                Professional recording and mixing services
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <FontAwesomeIcon
                icon={faGuitar}
                className="text-4xl text-black mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                Session Work
              </h3>
              <p className="text-gray-600">
                Guitar, bass, drums, and other instrumental sessions
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-4xl text-black mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-black">
                Remote Services
              </h3>
              <p className="text-gray-600">
                Remote mixing and mastering services
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  About Evan J. Martin
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Based in Leeds and working from his own studio, and Eiger
                  Studios for bigger projects, Evan brings professional
                  production, mixing, and mastering to artists across all
                  budgets. Whether you're just starting out or ready to take
                  your music to the next level, let's discuss how we can work
                  together to bring your vision to life.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">
                      House Sound Engineer
                    </h4>
                    <p className="text-gray-600">
                      Evan is the house sound engineer for{" "}
                      <a
                        href="https://thehangoversessions.co.uk"
                        target="_blank"
                        className="text-black hover:text-gray-600 underline font-medium"
                      >
                        The Hangover Sessions
                      </a>
                      , offering live session recording and engineering
                      services.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">
                      House Producer
                    </h4>
                    <p className="text-gray-600">
                      As the house producer for Private Records, Evan works with
                      emerging and established artists to create high-quality
                      productions.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-black mr-3"
                    />
                    <span>Leeds</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-black mr-3"
                    />
                    <a
                      href="mailto:evanjmartinproductions@gmail.com"
                      className="text-black hover:text-gray-600 transition-colors underline"
                    >
                      evanjmartinproductions@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <h4 className="text-2xl font-bold text-black mb-6">
                  Services Offered
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMusic}
                      className="text-black mr-3"
                    />
                    Full music production
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      className="text-black mr-3"
                    />
                    Recording & mixing
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faGuitar}
                      className="text-black mr-3"
                    />
                    Session musician work
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      className="text-black mr-3"
                    />
                    Remote mixing & mastering
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMusic}
                      className="text-black mr-3"
                    />
                    Live session recording
                  </li>
                </ul>
                <div className="mt-8">
                  <a
                    href="mailto:evanjmartinproductions@gmail.com"
                    className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Evan J. Martin Productions
          </h3>
          <p className="text-gray-300 mb-4">
            Professional Music Production • Leeds
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:evanjmartinproductions@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            </a>
            <a
              href="https://www.instagram.com/evanjmartinproductions/"
              target="_blank"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
