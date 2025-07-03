import {createReducer} from '@reduxjs/toolkit';
import {CITIES} from '../const';
import {Offer} from '../types/offer';
import {changeCityAction, loadOffersAction, setErrorAction, setOffersLoadingStatusAction} from './action';

type InitialState = {
  city: string;
  offers: Offer[];
  error: string | null;
  isOffersLoading: boolean;
};

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  error: null,
  isOffersLoading: false
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
    });
});

export {reducer};
