import {createAction} from '@reduxjs/toolkit';
import {Offer, StandaloneOffer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user';
import {AppRoute, AuthorizationStatus} from '../const';

const changeCityAction = createAction<{city: string}>('main/changeCity');

const loadOffersAction = createAction<{offers: Offer[]}>('data/loadOffers');

const loadNearPlacesAction = createAction<{nearPlaces: Offer[]}>('data/loadNearPlaces');

const loadReviewsAction = createAction<{reviews: Review[]}>('data/loadReviews');

const loadStandaloneOfferAction = createAction<{requestedOffer: StandaloneOffer | null}>('data/loadStandaloneOffer');

const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

const setAuthorizationStatusAction = createAction<{authorizationStatus: AuthorizationStatus}>('user/setAuthorizationStatus');

const setErrorAction = createAction<{error: string | null}>('app/setError');

const setNearPlacesLoadingStatusAction = createAction<{isNearPlacesLoading: boolean}>('data/setNearPlacesLoadingStatus');

const setOfferNotFoundAction = createAction<{isOfferNotFound: boolean}>('data/setOfferNotFound');

const setOffersLoadingStatusAction = createAction<{isOffersLoading: boolean}>('data/setOffersLoadingStatus');

const setReviewsLoadingStatusAction = createAction<{isReviewsLoading: boolean}>('data/setReviewsLoadingStatus');

const setStandaloneOfferLoadingStatusAction = createAction<{isStandaloneOfferLoading: boolean}>('data/setStandaloneOfferLoadingStatus');

const setUserDataAction = createAction<{user: UserData | null}>('user/setData');

export {
  changeCityAction,
  loadNearPlacesAction,
  loadOffersAction,
  loadReviewsAction,
  loadStandaloneOfferAction,
  redirectToRouteAction,
  setAuthorizationStatusAction,
  setErrorAction,
  setNearPlacesLoadingStatusAction,
  setOfferNotFoundAction,
  setOffersLoadingStatusAction,
  setReviewsLoadingStatusAction,
  setStandaloneOfferLoadingStatusAction,
  setUserDataAction
};
