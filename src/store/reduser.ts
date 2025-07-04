import {createReducer} from '@reduxjs/toolkit';
import {CITIES, AuthorizationStatus} from '../const';
import {Offer, StandaloneOffer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user';
import {changeCityAction, loadNearPlacesAction, loadOffersAction, loadReviewsAction, loadStandaloneOfferAction, setAuthorizationStatusAction, setErrorAction, setNearPlacesLoadingStatusAction, setOfferNotFoundAction, setOffersLoadingStatusAction, setReviewsLoadingStatusAction, setStandaloneOfferLoadingStatusAction, setUserDataAction} from './action';

type InitialState = {
  city: string;
  offers: Offer[];
  error: string | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  requestedOffer: StandaloneOffer | null;
  reviews: Review[];
  isStandaloneOfferLoading: boolean;
  isReviewsLoading: boolean;
  isNearPlacesLoading: boolean;
  nearPlaces: Offer[];
  isOfferNotFound: boolean;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  error: null,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  requestedOffer: null,
  reviews: [],
  isStandaloneOfferLoading: false,
  isReviewsLoading: false,
  isNearPlacesLoading: false,
  nearPlaces: [],
  isOfferNotFound: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(setErrorAction, (state, action) => {
      state.error = action.payload.error;
    })
    .addCase(setOffersLoadingStatusAction, (state, action) => {
      state.isOffersLoading = action.payload.isOffersLoading;
    })
    .addCase(setAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
    })
    .addCase(setUserDataAction, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(loadStandaloneOfferAction, (state, action) => {
      state.requestedOffer = action.payload.requestedOffer;
    })
    .addCase(loadReviewsAction, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(setStandaloneOfferLoadingStatusAction, (state, action) => {
      state.isStandaloneOfferLoading = action.payload.isStandaloneOfferLoading;
    })
    .addCase(setReviewsLoadingStatusAction, (state, action) => {
      state.isReviewsLoading = action.payload.isReviewsLoading;
    })
    .addCase(setNearPlacesLoadingStatusAction, (state, action) => {
      state.isNearPlacesLoading = action.payload.isNearPlacesLoading;
    })
    .addCase(loadNearPlacesAction, (state, action) => {
      state.nearPlaces = action.payload.nearPlaces;
    })
    .addCase(setOfferNotFoundAction, (state, action) => {
      state.isOfferNotFound = action.payload.isOfferNotFound;
    });
});

export {reducer};
