// Temporary sample data for the Browse by Categories section.
// Replace with your API/MongoDB data later — the shape below is what the UI expects.

export type Category = {
  id: string;
  name: string;
  icon: "camera" | "mic" | "music" | "video" | "palette";
};

export const categories: Category[] = [
  { id: "1", name: "Photography Studio", icon: "camera" },
  { id: "2", name: "Podcast Room", icon: "mic" },
  { id: "3", name: "Music Studio", icon: "music" },
  { id: "4", name: "Video Production", icon: "video" },
  { id: "5", name: "Creative Space", icon: "palette" },
];
