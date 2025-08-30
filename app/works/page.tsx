'use client';

import { Track } from "@/src/types";
import { useState, useEffect } from "react";
import WorkCard from "@/components/WorkCard";
import { getSelectedWorks } from "@/src/lib/pocketbase";

export default function Works() {
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
        setError("Failed to load featured works. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  const highlighted = tracks.filter((w: Track) => w.highlighted);

  if (loading) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading featured works...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  if (highlighted.length === 0) {
    return (
      <main className="p-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">
            {tracks.length === 0
              ? "No tracks found in the database."
              : "No featured works selected yet."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlighted.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
