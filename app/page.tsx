"use client";

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
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
import WorkCard from "@/src/components/WorkCard";

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
                <WorkCard
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
                  <WorkCard key={work.id} work={work} />
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
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">
                  About Evan J. Martin
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Based in Leeds and working from his own studio, and Eiger
                  Studios for bigger projects, Evan brings unique production,
                  mixing, and mastering to artists across all budgets.
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
                      , offering live location recording and engineering
                      services.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-black mb-2">
                      House Producer
                    </h4>
                    <p className="text-gray-600">
                      As the house producer for{" "}
                      <a
                        href="https://www.privateregcords.co.uk"
                        target="_blank"
                        className="text-black hover:text-gray-600 underline font-medium"
                      >
                        Private Regcords
                      </a>
                      , Evan works with emerging Leeds artists such as Rhiannon
                      Hope, Normal Village, and more.
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
            Production • Mixing • Mastering • Leeds
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
