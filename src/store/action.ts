import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

const changeCityAction = createAction<{city: string}>('main/changeCity');

const loadOffersAction = createAction<{offers: Offer[]}>('data/loadOffers');

const setErrorAction = createAction<{error: string | null}>('app/setError');

const setOffersLoadingStatusAction = createAction<{isOffersLoading: boolean}>('data/setOffersLoadingStatus');

export {
  changeCityAction,
  loadOffersAction,
  setErrorAction,
  setOffersLoadingStatusAction
};
