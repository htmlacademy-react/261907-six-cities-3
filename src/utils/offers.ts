import {Sorting} from '../const';
import {Offer, LocationWithOffers, OfferLocationInfo, StandaloneOffer, FavoriteOffer} from '../types/offer';

function checkFavorites(offers: Offer[], favorites: Offer[]): Offer[] {
  const favoritesIds = favorites.map((offer: Offer) => offer.id);

  return offers.map((offer: Offer) => ({...offer, isFavorite: favoritesIds.includes(offer.id)}));
}

function clearFavorites(offers: Offer[]): Offer[] {
  return offers.map((offer: Offer) => ({...offer, isFavorite: false}));
}

function extractInfoForMap(offer: Offer | StandaloneOffer): OfferLocationInfo {
  return {
    id: offer.id,
    city: offer.city,
    location: offer.location
  };
}

function extractOfferFromFavorite(favorite: FavoriteOffer): Offer {
  const offer = {
    id: favorite.id,
    title: favorite.title,
    type: favorite.type,
    price: favorite.price,
    city: favorite.city,
    location: favorite.location,
    isFavorite: favorite.isFavorite,
    isPremium: favorite.isPremium,
    rating: favorite.rating,
    previewImage: favorite.previewImage
  };

  return offer;
}

function findFavorites(offers: Offer[]): Offer[] {
  return offers.filter((offer: Offer) => offer.isFavorite);
}

function findOffersAndChangeFavoriteStatus(offers: Offer[], {id, isFavorite}: Offer): Offer[] {
  const offerToUpdate = offers.find((offer) => offer.id === id);

  if (offerToUpdate) {
    offerToUpdate.isFavorite = isFavorite;
  }

  return offers;
}

function sortOffersByLocation(offers: Offer[]): LocationWithOffers[] {
  const result: LocationWithOffers[] = [];

  offers.forEach((it: Offer) => {
    const requiredLocation = result.find((location) => location.name === it.city.name);

    if (requiredLocation) {
      requiredLocation.offers.push(it);
    } else {
      result.push({
        name: it.city.name,
        offers: [it]
      });
    }
  });

  return result;
}

function sortPriceAsc(offerA: Offer, offerB: Offer): number {
  return offerA.price - offerB.price;
}

function sortPriceDesc(offerA: Offer, offerB: Offer): number {
  return offerB.price - offerA.price;
}

function sortRating(offerA: Offer, offerB: Offer): number {
  return offerB.rating - offerA.rating;
}

function updateFavorites(favorites: Offer[], offerToUpdate: FavoriteOffer): Offer[] {
  const offer = extractOfferFromFavorite(offerToUpdate);
  const isInFavorites = favorites.some((favorite) => favorite.id === offer.id);

  return isInFavorites ? favorites.filter((favorite) => favorite.id !== offer.id) : [...favorites, offer];
}

function updateOffersToRender(offers: Offer[], city: string, sorting: Sorting): Offer[] {
  const requiredOffers = offers.filter((offer: Offer) => offer.city.name === city);

  switch (sorting) {
    case Sorting.PriceAsc:
      return requiredOffers.sort(sortPriceAsc);
    case Sorting.PriceDesc:
      return requiredOffers.sort(sortPriceDesc);
    case Sorting.TopRated:
      return requiredOffers.sort(sortRating);
  }

  return requiredOffers;
}

export {
  checkFavorites,
  clearFavorites,
  extractInfoForMap,
  extractOfferFromFavorite,
  findFavorites,
  findOffersAndChangeFavoriteStatus,
  sortOffersByLocation,
  updateFavorites,
  updateOffersToRender
};
