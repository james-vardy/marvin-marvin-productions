"use client";

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
import WorkCard from "@/components/WorkCard";
import { getSelectedWorks } from "@/src/lib/pocketbase";

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

  if (worksWithStream.length === 0) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">No Tracks Available</h2>
          <p className="text-gray-600">
            {tracks.length === 0
              ? "No tracks found in the database."
              : "No tracks with streaming links available."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recent Productions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the latest music productions and collaborations from Evan J.
            Martin Productions
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {worksWithStream.map((work: Track) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Showing {worksWithStream.length} track
            {worksWithStream.length !== 1 ? "s" : ""} out of {tracks.length}{" "}
            total
          </p>
        </div>
      </div>
    </main>
  );
}
