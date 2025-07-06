import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, StandaloneOffer} from '../../types/offer';
import {Review} from '../../types/review';

function getNearPlaces(state: State): Offer[] {
  return state[NameSpace.Data].nearPlaces;
}

function getNearPlacesLoadingStatus(state: State): boolean {
  return state[NameSpace.Data].isNearPlacesLoading;
}

function getOfferErrorStatus(state: State): boolean {
  return state[NameSpace.Data].isOfferNotFound;
}

function getOffers(state: State): Offer[] {
  return state[NameSpace.Data].offers;
}

function getOffersLoadingStatus(state: State): boolean {
  return state[NameSpace.Data].isOffersLoading;
}

function getReviews(state: State): Review[] {
  return state[NameSpace.Data].reviews;
}

function getReviewsLoadingStatus(state: State): boolean {
  return state[NameSpace.Data].isReviewsLoading;
}

function getStandaloneOffer(state: State): StandaloneOffer | null {
  return state[NameSpace.Data].requestedOffer;
}

function getStandaloneOfferLoadingStatus(state: State): boolean {
  return state[NameSpace.Data].isStandaloneOfferLoading;
}

export {
  getNearPlaces,
  getNearPlacesLoadingStatus,
  getOfferErrorStatus,
  getOffers,
  getOffersLoadingStatus,
  getReviews,
  getReviewsLoadingStatus,
  getStandaloneOffer,
  getStandaloneOfferLoadingStatus
};
