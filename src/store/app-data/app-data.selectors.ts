import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, StandaloneOffer} from '../../types/offer';
import {Review} from '../../types/review';

function getNearPlaces(state: Pick<State, NameSpace.Data>): Offer[] {
  return state[NameSpace.Data].nearPlaces;
}

function getNearPlacesLoadingStatus(state: Pick<State, NameSpace.Data>): boolean {
  return state[NameSpace.Data].isNearPlacesLoading;
}

function getOfferErrorStatus(state: Pick<State, NameSpace.Data>): boolean {
  return state[NameSpace.Data].isOfferNotFound;
}

function getOffers(state: Pick<State, NameSpace.Data>): Offer[] {
  return state[NameSpace.Data].offers;
}

function getOffersLoadingStatus(state: Pick<State, NameSpace.Data>): boolean {
  return state[NameSpace.Data].isOffersLoading;
}

function getReviews(state: Pick<State, NameSpace.Data>): Review[] {
  return state[NameSpace.Data].reviews;
}

function getReviewsLoadingStatus(state: Pick<State, NameSpace.Data>): boolean {
  return state[NameSpace.Data].isReviewsLoading;
}

function getStandaloneOffer(state: Pick<State, NameSpace.Data>): StandaloneOffer | null {
  return state[NameSpace.Data].requestedOffer;
}

function getStandaloneOfferLoadingStatus(state: Pick<State, NameSpace.Data>): boolean {
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
