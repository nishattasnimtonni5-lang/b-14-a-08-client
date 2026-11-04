// Shape of a studio document returned by the studios API.

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

