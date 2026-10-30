// Temporary sample data for the Featured Studios section.
// Replace the `image` URLs (and the whole array) with your API/MongoDB data later —
// the shape below is what the UI component expects.

export type Studio = {
  id: string;
  name: string;
  category: string;
  price: number; // per hour, USD
  rating: number;
  reviews: number;
  location: string;
  image: string;
};

export const featuredStudios: Studio[] = [
  {
    id: "1",
    name: "The Lumiere Studio",
    category: "Photo Studio",
    price: 45,
    rating: 4.8,
    reviews: 214,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "The Audio Nest",
    category: "Podcast Room",
    price: 30,
    rating: 4.7,
    reviews: 89,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Sound Forge Studio",
    category: "Music Studio",
    price: 60,
    rating: 4.8,
    reviews: 156,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "The Vision Stage",
    category: "Sound Stage",
    price: 80,
    rating: 4.9,
    reviews: 102,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1470229722913-7ea0a75329c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "The Creative Hive",
    category: "Art Workshop",
    price: 35,
    rating: 4.6,
    reviews: 73,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Pixel Studio",
    category: "Photo Studio",
    price: 50,
    rating: 4.8,
    reviews: 118,
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];
