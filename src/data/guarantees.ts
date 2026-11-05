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
    title: "Host Protection & Liability Protection",
    description:
      "Robust host liability coverage plus property protection for your studio, so every booking is backed from check-in to check-out.",
    icon: "shield",
  },
  {
    id: "2",
    title: "Verified Profiles",
    description:
      "Every user and host profile is verified before they can book or list, keeping your studio and your guests safe.",
    icon: "lock",
  },
  {
    id: "3",
    title: "Equipment Safety",
    description:
      "Clear equipment safety guidelines and assurances under our Creator Support, so gear is used, handled and returned safely.",
    icon: "zap",
  },
  {
    id: "4",
    title: "24/7 Host Support",
    description:
      "A dedicated host support team available around the clock — questions, issues or emergencies answered anytime, day or night.",
    icon: "headphones",
  },
];
