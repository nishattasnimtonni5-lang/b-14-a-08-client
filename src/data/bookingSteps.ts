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
    description: "Browse and find the perfect studio for your project.",
    icon: "search",
  },
  {
    id: "2",
    step: "02",
    title: "Choose Your Space",
    description: "Pick the studio that fits your creative vision.",
    icon: "grid",
  },
  {
    id: "3",
    step: "03",
    title: "Book Your Time",
    description: "Select your dates and secure the booking in minutes.",
    icon: "calendar",
  },
  {
    id: "4",
    step: "04",
    title: "Create Something Amazing",
    description: "Bring your ideas to life in the perfect space.",
    icon: "sparkles",
  },
];
