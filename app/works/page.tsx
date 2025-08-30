import { Track } from "@/src/types";
import WorkCard from "@/components/WorkCard";
import { getSelectedWorks } from "@/src/lib/pocketbase";

export default async function Works() {
  let tracks: Track[] = [];

  try {
    tracks = await getSelectedWorks();
  } catch (error) {
    console.error("Failed to fetch from PocketBase:", error);
  }

  const highlighted = tracks.filter((w: Track) => w.highlighted);

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
