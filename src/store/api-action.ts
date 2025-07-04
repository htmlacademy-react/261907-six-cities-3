import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ERROR_TIMEOUT, ApiRoute, AuthorizationStatus, AppRoute} from '../const';
import {AppDispatch, State} from '../types/state';
import {AuthorizationData, CommentOptions, UserData} from '../types/user';
import {Offer, StandaloneOffer} from '../types/offer';
import {Review} from '../types/review';
import {loadNearPlacesAction, loadOffersAction, loadReviewsAction, loadStandaloneOfferAction, redirectToRouteAction, setAuthorizationStatusAction, setErrorAction, setNearPlacesLoadingStatusAction, setOfferNotFoundAction, setOffersLoadingStatusAction, setReviewsLoadingStatusAction, setStandaloneOfferLoadingStatusAction, setUserDataAction} from './action';
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

const requestNearPlacesAction = createAsyncThunk<void, string, ThunkOptions>(
  'data/requestNearPlaces',
  async (id, {dispatch, extra: api}) => {
    dispatch(setNearPlacesLoadingStatusAction({isNearPlacesLoading: true}));
    dispatch(setOfferNotFoundAction({isOfferNotFound: false}));

    try {
      const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);

      dispatch(loadNearPlacesAction({nearPlaces: data}));
    } catch {
      dispatch(setOfferNotFoundAction({isOfferNotFound: true}));
    } finally {
      dispatch(setNearPlacesLoadingStatusAction({isNearPlacesLoading: false}));
    }
  }
);

const requestReviewsForOfferAction = createAsyncThunk<void, string, ThunkOptions>(
  'data/requestReviewsForOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setReviewsLoadingStatusAction({isReviewsLoading: true}));

    try {
      const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);

      dispatch(loadReviewsAction({reviews: data}));
    } finally {
      dispatch(setReviewsLoadingStatusAction({isReviewsLoading: false}));
    }
  }
);

const requestStandaloneOfferAction = createAsyncThunk<void, string, ThunkOptions>(
  'data/requestStandaloneOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setStandaloneOfferLoadingStatusAction({isStandaloneOfferLoading: true}));

    try {
      const {data} = await api.get<StandaloneOffer>(`${ApiRoute.Offers}/${id}`);

      dispatch(loadStandaloneOfferAction({requestedOffer: data}));
    } finally {
      dispatch(setStandaloneOfferLoadingStatusAction({isStandaloneOfferLoading: false}));
    }
  }
);

const sendCommentAction = createAsyncThunk<void, CommentOptions, ThunkOptions>(
  'user/comment',
  async ({id, commentData}, {dispatch, extra: api}) => {
    const {rating, comment} = commentData;
    const {data} = await api.post<Review>(`${ApiRoute.Comments}/${id}`, {rating, comment});
    const updatedReviews: Review[] = [...store.getState().reviews, data];

    dispatch(loadReviewsAction({reviews: updatedReviews}));
  }
);

export {
  checkAuthorizationAction,
  clearErrorAction,
  getOffersAction,
  loginAction,
  logoutAction,
  requestNearPlacesAction,
  requestReviewsForOfferAction,
  requestStandaloneOfferAction,
  sendCommentAction
};
