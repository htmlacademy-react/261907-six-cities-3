import {createReducer} from '@reduxjs/toolkit';
import {CITIES, Sorting} from '../const';
import {updateOffersToRender} from '../utils';
import {offers} from '../mocks/offers';
import {changeCityAction, changeSortingAction, renderOffersAction} from './action';

const initialState = {
  city: CITIES[0],
  sorting: Sorting.Popular,
  offers,
  offersToRender: updateOffersToRender(offers, CITIES[0], Sorting.Popular)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      const {city} = action.payload;

      state.city = city;
      state.sorting = Sorting.Popular;
      state.offersToRender = updateOffersToRender(state.offers, state.city, state.sorting);
    })
    .addCase(renderOffersAction, (state, action) => {
      const {offersToRender} = action.payload;

      state.offersToRender = offersToRender;
    })
    .addCase(changeSortingAction, (state, action) => {
      const {sorting} = action.payload;

      state.sorting = sorting;
      state.offersToRender = updateOffersToRender(state.offers, state.city, state.sorting);
    });
});

export {reducer};
