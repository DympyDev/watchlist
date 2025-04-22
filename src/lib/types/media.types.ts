export interface MediaCollection {
  key: string;  // e.g., 'mcu', 'star-wars'
  name: string; // e.g., 'Marvel Cinematic Universe', 'Star Wars Saga'
  description: string;
  coverImage: string;
  sections: MediaSection[];
  sources?: {
    name: string;
    url: string;
  }[];
}

export interface MediaSection {
  name: string;
  media: MediaItem[];
}

export interface MediaItem {
  id: string;
  name: string;
  subLine?: string;
  image: string;
  watched: boolean;
  comicSize: "full" | "half" | "third" | "two-thirds";
}
