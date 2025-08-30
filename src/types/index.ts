// PocketBase types
export interface PocketBaseRecord {
  id: string;
  collectionName: string;
  created: string;
  updated: string;
}

export interface PocketBaseListResult<T = any> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

// Application types for PocketBase
export interface Track extends PocketBaseRecord {
  trackName: string;
  artistName: string;
  releaseDate?: string;
  description?: string;
  spotifyLink?: string;
  appleMusicLink?: string;
  youtubeLink?: string;
  soundCloudLink?: string;
  tidalLink?: string;
  evanRole?: string;
  highlighted?: boolean;
  coverImage?: string; // filename in PocketBase
  trackFile?: string; // filename in PocketBase (WAV master)
  streamingFile?: string; // filename in PocketBase (MP3/M4A for streaming)
  previewFile?: string; // filename in PocketBase (30-60 second preview)
}

export interface ProfessionalDetail extends PocketBaseRecord {
  name: string;
  bio: string;
  instagramLink: string;
  emailAddress: string;
  phoneNumber: string;
  portrait?: string; // filename in PocketBase
  homePagePictures?: string[]; // filenames in PocketBase
}
