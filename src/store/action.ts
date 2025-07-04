import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {UserData} from '../types/user';
import {AppRoute, AuthorizationStatus} from '../const';

const changeCityAction = createAction<{city: string}>('main/changeCity');

const loadOffersAction = createAction<{offers: Offer[]}>('data/loadOffers');

const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

const setAuthorizationStatusAction = createAction<{authorizationStatus: AuthorizationStatus}>('user/setAuthorizationStatus');

const setErrorAction = createAction<{error: string | null}>('app/setError');

const setOffersLoadingStatusAction = createAction<{isOffersLoading: boolean}>('data/setOffersLoadingStatus');

const setUserDataAction = createAction<{user: UserData | null}>('user/setData');

export {
  changeCityAction,
  loadOffersAction,
  redirectToRouteAction,
  setAuthorizationStatusAction,
  setErrorAction,
  setOffersLoadingStatusAction,
  setUserDataAction
};
