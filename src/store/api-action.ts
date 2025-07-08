import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute, AppRoute} from '../const';
import {AppDispatch, State} from '../types/state';
import {AuthorizationData, UserData} from '../types/user';
import {FavoriteData, FavoriteOffer, Offer, StandaloneOffer} from '../types/offer';
import {CommentOptions, Review} from '../types/review';
import {redirectToRouteAction} from './action';
import {dropToken, saveToken} from '../services/token';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const changeFavoriteStatusAction = createAsyncThunk<FavoriteOffer, FavoriteData, ThunkOptions>(
  'data/changeFavoriteStatus',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<FavoriteOffer>(`${ApiRoute.Favorite}/${id}/${status}`);

    return data;
  }
);

const checkAuthorizationAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuthorization',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(ApiRoute.Login);

    return data;
  }
);

const getFavoritesAction = createAsyncThunk<Offer[], undefined, ThunkOptions>(
  'data/getFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Favorite);

    return data;
  }
);

const getOffersAction = createAsyncThunk<Offer[], undefined, ThunkOptions>(
  'data/getOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);

    return data;
  }
);

const loginAction = createAsyncThunk<UserData, AuthorizationData, ThunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(getFavoritesAction());
    dispatch(redirectToRouteAction(AppRoute.Main));

    return data;
  }
);

const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

const requestNearPlacesAction = createAsyncThunk<Offer[], string, ThunkOptions>(
  'data/requestNearPlaces',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);

    return data;
  }
);

const requestReviewsForOfferAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/requestReviewsForOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);

    return data;
  }
);

const requestStandaloneOfferAction = createAsyncThunk<StandaloneOffer, string, ThunkOptions>(
  'data/requestStandaloneOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<StandaloneOffer>(`${ApiRoute.Offers}/${id}`);

    return data;
  }
);

const sendCommentAction = createAsyncThunk<Review, CommentOptions, ThunkOptions>(
  'data/addNewComment',
  async ({id, commentData}, {extra: api}) => {
    const {rating, comment} = commentData;
    const {data} = await api.post<Review>(`${ApiRoute.Comments}/${id}`, {rating, comment});

    return data;
  }
);

export {
  changeFavoriteStatusAction,
  checkAuthorizationAction,
  getFavoritesAction,
  getOffersAction,
  loginAction,
  logoutAction,
  requestNearPlacesAction,
  requestReviewsForOfferAction,
  requestStandaloneOfferAction,
  sendCommentAction
};
