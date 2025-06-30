import {Offer, LocationWithOffers} from './types/offer';

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
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

export {
  capitalize,
  sortOffersByLocation
};
