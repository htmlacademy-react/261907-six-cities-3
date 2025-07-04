import {createReducer} from '@reduxjs/toolkit';
import {CITIES, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {UserData} from '../types/user';
import {changeCityAction, loadOffersAction, setAuthorizationStatusAction, setErrorAction, setOffersLoadingStatusAction, setUserDataAction} from './action';

type InitialState = {
  city: string;
  offers: Offer[];
  error: string | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  error: null,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      const {city} = action.payload;

      state.city = city;
    })
    .addCase(loadOffersAction, (state, action) => {
      const {offers} = action.payload;

      state.offers = offers;
    })
    .addCase(setErrorAction, (state, action) => {
      const {error} = action.payload;

      state.error = error;
    })
    .addCase(setOffersLoadingStatusAction, (state, action) => {
      const {isOffersLoading} = action.payload;

      state.isOffersLoading = isOffersLoading;
    })
    .addCase(setAuthorizationStatusAction, (state, action) => {
      const {authorizationStatus} = action.payload;

      state.authorizationStatus = authorizationStatus;
    })
    .addCase(setUserDataAction, (state, action) => {
      const {user} = action.payload;

      state.user = user;
    });
});

export {reducer};
