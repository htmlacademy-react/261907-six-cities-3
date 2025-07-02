import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

const changeCityAction = createAction<{city: string}>('changeCity');

const renderOffersAction = createAction<{offers: Offer[]}>('renderOffers');

export {
  changeCityAction,
  renderOffersAction
};
