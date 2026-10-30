// Static sample data for the Host Guarantee & Creator Support section.
// Swap for your API/MongoDB data later if you want these dynamic.

export type Guarantee = {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "lock" | "headphones" | "zap";
};

export const guarantees: Guarantee[] = [
  {
    id: "1",
    title: "Host Protection",
    description: "Verified bookings and property coverage for every studio host.",
    icon: "shield",
  },
  {
    id: "2",
    title: "Secure Bookings",
    description: "Encrypted payments and protected reservations, every time.",
    icon: "lock",
  },
  {
    id: "3",
    title: "Creator Support",
    description: "A dedicated team helping creators from search to wrap-up.",
    icon: "headphones",
  },
  {
    id: "4",
    title: "Reliable Experience",
    description: "Trusted reviews and real-time confirmation you can count on.",
    icon: "zap",
  },
];
