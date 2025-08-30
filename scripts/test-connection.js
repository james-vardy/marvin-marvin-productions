const PocketBase = require("pocketbase/cjs");
require("dotenv").config({ path: ".env.local" });

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

async function testConnection() {
  try {
    console.log(
      "Testing connection to:",
      process.env.NEXT_PUBLIC_POCKETBASE_URL
    );

    // Test authentication
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log("✅ Authentication successful");

    // Test collections
    const collections = await pb.collections.getFullList();
    console.log(`✅ Found ${collections.length} collections`);

    // Test selected_works collection
    try {
      const works = await pb.collection("selected_works").getFullList();
      console.log(
        `✅ Found ${works.length} works in selected_works collection`
      );
    } catch (error) {
      console.log("ℹ️ selected_works collection not found or empty");
    }
  } catch (error) {
    console.error("❌ Connection test failed:", error.message);
  }
}

testConnection();
