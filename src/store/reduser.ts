import {createReducer} from '@reduxjs/toolkit';
import {CITIES} from '../const';
import {offers} from '../mocks/offers';
import {changeCityAction, renderOffersAction} from './action';

const initialState = {
  city: CITIES[0],
  offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      const {city} = action.payload;

      state.city = city;
    })
    .addCase(renderOffersAction, (state, action) => {
      const {offers: updatedOffers} = action.payload;

      state.offers = updatedOffers;
    });
});

export {reducer};
