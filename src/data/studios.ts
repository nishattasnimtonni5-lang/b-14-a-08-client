export type Studio = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  securityDeposit?: number;
  maxCapacity?: number;
  amenities?: string[];
  overview?: string;
  userName?: string;
  userEmail?: string;
  gallery?: string[];
};