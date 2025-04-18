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
