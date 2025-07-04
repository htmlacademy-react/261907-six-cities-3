import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ERROR_TIMEOUT, ApiRoute, AuthorizationStatus, AppRoute} from '../const';
import {AppDispatch, State} from '../types/state';
import {AuthorizationData, UserData} from '../types/user';
import {Offer} from '../types/offer';
import {loadOffersAction, redirectToRouteAction, setAuthorizationStatusAction, setErrorAction, setOffersLoadingStatusAction, setUserDataAction} from './action';
import {store} from './';
import {dropToken, saveToken} from '../services/token';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const checkAuthorizationAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/checkAuthorization',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(ApiRoute.Login);
      dispatch(setAuthorizationStatusAction({authorizationStatus: AuthorizationStatus.Auth}));
      dispatch(setUserDataAction({user: data}));
    } catch {
      dispatch(setAuthorizationStatusAction({authorizationStatus: AuthorizationStatus.NoAuth}));
    }
  }
);

const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(() => {
      store.dispatch(setErrorAction({error: null}));
    }, ERROR_TIMEOUT);
  }
);

const getOffersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/getOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatusAction({isOffersLoading: true}));

    const {data} = await api.get<Offer[]>(ApiRoute.Offers);

    dispatch(setOffersLoadingStatusAction({isOffersLoading: false}));
    dispatch(loadOffersAction({offers: data}));
  }
);

const loginAction = createAsyncThunk<void, AuthorizationData, ThunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(setAuthorizationStatusAction({authorizationStatus: AuthorizationStatus.Auth}));
    dispatch(setUserDataAction({user: data}));
    dispatch(redirectToRouteAction(AppRoute.Main));
  }
);

const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatusAction({authorizationStatus: AuthorizationStatus.NoAuth}));
    dispatch(setUserDataAction({user: null}));
  }
);

export {
  checkAuthorizationAction,
  clearErrorAction,
  getOffersAction,
  loginAction,
  logoutAction
};
