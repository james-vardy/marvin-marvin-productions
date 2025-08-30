const PocketBase = require("pocketbase/cjs");
require("dotenv").config({ path: ".env.local" });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

async function testAppIntegration() {
  try {
    console.log("🧪 Testing Next.js app integration with PocketBase...");
    console.log(`🔗 Connecting to: ${process.env.NEXT_PUBLIC_POCKETBASE_URL}`);

    // Test public access (how the app accesses it)
    const records = await pb.collection("selected_works").getFullList();
    console.log(`✅ Successfully fetched ${records.length} records`);

    if (records.length > 0) {
      console.log("\n🎵 Sample tracks:");
      records.slice(0, 5).forEach((record, index) => {
        console.log(
          `${index + 1}. "${record.trackName}" by ${record.artistName}`
        );
        console.log(`   Release: ${record.releaseDate || "N/A"}`);
        console.log(`   Highlighted: ${record.highlighted}`);
        console.log(`   Spotify: ${record.spotifyLink ? "✓" : "✗"}`);
        console.log(`   Apple Music: ${record.appleMusicLink ? "✓" : "✗"}`);
        console.log(`   YouTube: ${record.youtubeLink ? "✓" : "✗"}`);
        console.log("");
      });

      // Count streaming platforms
      const withSpotify = records.filter((r) => r.spotifyLink).length;
      const withApple = records.filter((r) => r.appleMusicLink).length;
      const withYoutube = records.filter((r) => r.youtubeLink).length;
      const highlighted = records.filter((r) => r.highlighted).length;

      console.log("📊 Statistics:");
      console.log(`   Total tracks: ${records.length}`);
      console.log(`   Highlighted tracks: ${highlighted}`);
      console.log(`   With Spotify links: ${withSpotify}`);
      console.log(`   With Apple Music links: ${withApple}`);
      console.log(`   With YouTube links: ${withYoutube}`);
      console.log(
        `   Tracks with any streaming platform: ${
          records.filter(
            (r) =>
              r.spotifyLink ||
              r.appleMusicLink ||
              r.youtubeLink ||
              r.soundCloudLink
          ).length
        }`
      );
    }

    console.log(
      "\n🎉 Integration test successful! Your Next.js app can now access PocketBase data."
    );
  } catch (error) {
    console.error("❌ Integration test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.status);
      console.error("Response data:", JSON.stringify(error.response, null, 2));
    }
  }
}

testAppIntegration();
