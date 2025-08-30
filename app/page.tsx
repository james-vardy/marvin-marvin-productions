"use client";

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
import WorkCard from "@/components/WorkCard";
import { getSelectedWorks } from "@/src/lib/pocketbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faMusic, faMicrophone, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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

  // Filter tracks that have streaming links
  const worksWithStream = tracks.filter(
    (w: Track) =>
      w.spotifyLink || w.appleMusicLink || w.youtubeLink || w.soundCloudLink
  );

  // Filter featured works
  const featuredWorks = tracks.filter((w: Track) => w.highlighted);

  if (loading) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Loading Portfolio...</h2>
          <p className="text-gray-600">Fetching tracks from database...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Professional Music Production
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Creating exceptional music across all genres from South Leeds and Eiger Studios. 
            Working with artists of all budgets to bring their vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Portfolio
            </button>
            <a 
              href="mailto:evanjmartinproductions@gmail.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      {featuredWorks.length > 0 && (
        <section id="featured" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Highlighted productions showcasing the range and quality of Evan's work
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredWorks.map((work: Track) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the full range of music productions and collaborations
            </p>
          </div>

          {worksWithStream.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">No Tracks Available</h3>
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
                <p className="text-gray-500">
                  Showing {worksWithStream.length} track
                  {worksWithStream.length !== 1 ? "s" : ""} out of {tracks.length} total
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional music production services tailored to your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faMusic} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Music Production</h3>
              <p className="text-gray-600">Full track production from concept to final master</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faMicrophone} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recording & Mixing</h3>
              <p className="text-gray-600">Professional recording and mixing services</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FontAwesomeIcon icon={faGuitar} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Session Work</h3>
              <p className="text-gray-600">Guitar, bass, and other instrumental sessions</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Work Together</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Based in South Leeds and working from Eiger Studios, Evan brings professional 
                  music production to artists across all budgets. Whether you're just starting 
                  out or ready to take your music to the next level, let's discuss how we can 
                  bring your vision to life.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mr-3" />
                    <span>South Leeds & Eiger Studios</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 mr-3" />
                    <a href="mailto:evanjmartinproductions@gmail.com" className="hover:text-blue-600">
                      evanjmartinproductions@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faInstagram} className="text-blue-600 mr-3" />
                    <a href="https://www.instagram.com/evanjmartinproductions/" target="_blank" className="hover:text-blue-600">
                      @evanjmartinproductions
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
                  <FontAwesomeIcon icon={faPhone} className="text-3xl text-blue-600 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Ready to Start?</h4>
                  <p className="text-gray-600 mb-4">
                    Always happy to call and discuss your project
                  </p>
                  <a 
                    href="mailto:evanjmartinproductions@gmail.com"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
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
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Evan J. Martin Productions</h3>
          <p className="text-gray-400 mb-4">Professional Music Production • South Leeds & Eiger Studios</p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:evanjmartinproductions@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            </a>
            <a href="https://www.instagram.com/evanjmartinproductions/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
