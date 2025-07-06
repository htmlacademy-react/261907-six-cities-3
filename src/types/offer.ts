type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type FavoriteData = {
  id: string;
  status: number;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type LocationWithOffers = {
  name: string;
  offers: Offer[];
}

export type StandaloneOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};
