export interface APIResponse {
  data: Track[];
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Track {
  id: number;
  trackName: string;
  releaseDate: string;
  artistName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  streamingLink: string;
  highlighted: boolean | null;
  spotifyLink: string | null;
  appleMusicLink: string | null;
  youtubeLink: string | null;
  soundCloudLink: string | null;
  tidalLink: string | null;
  description: string | null;
  evanRole: string;
  documentId: string;
  coverImage: Image;
  trackFile: TrackFile | null;
}

export interface Image {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}

export interface Formats {
  thumbnail?: Format;
  small?: Format;
  medium?: Format;
  large?: Format;
}

export interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface TrackFile {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}
