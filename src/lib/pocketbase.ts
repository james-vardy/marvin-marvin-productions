/**
 * PocketBase client configuration using official SDK
 */
import PocketBase from "pocketbase";
import { Track } from "@/src/types";

const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

// Create PocketBase instance
export const pb = new PocketBase(POCKETBASE_URL);

// Helper functions for common operations
export async function getSelectedWorks() {
  try {
    const records = await pb.collection("selected_works").getFullList<Track>();
    return records;
  } catch (error) {
    console.error("Error fetching selected works:", error);
    throw error;
  }
}

export async function getSelectedWork(id: string) {
  try {
    const record = await pb.collection("selected_works").getOne<Track>(id);
    return record;
  } catch (error) {
    console.error("Error fetching selected work:", error);
    throw error;
  }
}

export function getFileUrl(record: any, filename: string, thumb = "") {
  if (!record || !filename) return "";
  return pb.files.getUrl(record, filename, { thumb });
}

export default pb;
