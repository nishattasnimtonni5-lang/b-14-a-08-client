// Static content for the How Booking Works section.
// Swap for your API/MongoDB data later if you want the steps dynamic.

export type BookingStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: "search" | "grid" | "calendar" | "sparkles";
};

export const bookingSteps: BookingStep[] = [
  {
    id: "1",
    step: "01",
    title: "Explore Studios",
    description:
      "Browse available studios and explore their details, facilities, and pricing.",
    icon: "search",
  },
  {
    id: "2",
    step: "02",
    title: "Choose Your Studio",
    description:
      "Select your preferred studio based on your needs and budget.",
    icon: "grid",
  },
  {
    id: "3",
    step: "03",
    title: "Book Your Session",
    description:
      "Select your preferred date and time and submit the booking form.",
    icon: "calendar",
  },
  {
    id: "4",
    step: "04",
    title: "Enjoy Your Experience",
    description:
      "Visit the studio at your scheduled time and enjoy your session.",
    icon: "sparkles",
  },
];
