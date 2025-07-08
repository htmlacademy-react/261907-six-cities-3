import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {InitialState} from '../../types/state';
import {changeFavoriteStatusAction, getFavoritesAction, getOffersAction, logoutAction, requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction, sendCommentAction} from '../api-action';
import {checkFavorites, clearFavorites, findFavorites, findOffersAndChangeFavoriteStatus, updateFavorites} from '../../utils/offers';

const initialState: Pick<InitialState, 'favorites' | 'isCommentDelivered' | 'isCommentProcessing' | 'isFavoritesLoading' | 'isFavoriteProcessing' | 'isNearPlacesLoading' | 'isOffersLoading' | 'isNotFoundError' | 'isReviewsLoading' | 'isStandaloneOfferLoading' | 'nearPlaces' |'offers' | 'requestedOffer' |'reviews'> = {
  favorites: [],
  isCommentDelivered: false,
  isCommentProcessing: false,
  isFavoritesLoading: false,
  isFavoriteProcessing: false,
  isNearPlacesLoading: false,
  isOffersLoading: false,
  isNotFoundError: false,
  isReviewsLoading: false,
  isStandaloneOfferLoading: false,
  nearPlaces: [],
  offers: [],
  requestedOffer: null,
  reviews: []
};

const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isFavoriteProcessing = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.isFavoriteProcessing = false;
        state.favorites = updateFavorites(state.favorites, action.payload);
        state.offers = findOffersAndChangeFavoriteStatus(state.offers, action.payload);

        if (state.requestedOffer && state.requestedOffer.id === action.payload.id) {
          state.requestedOffer.isFavorite = action.payload.isFavorite;
        } else if (state.nearPlaces.length) {
          state.nearPlaces = findOffersAndChangeFavoriteStatus(state.nearPlaces, action.payload);
        }
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.isFavoriteProcessing = false;
      })
      .addCase(getFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
        state.favorites = [];
      })
      .addCase(getFavoritesAction.fulfilled, (state, action) => {
        state.isFavoritesLoading = false;
        state.favorites = action.payload;
        state.offers = checkFavorites(state.offers, state.favorites);
      })
      .addCase(getFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.isNotFoundError = false;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
        state.favorites = findFavorites(state.offers);
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.offers = [];
        state.isNotFoundError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.offers = clearFavorites(state.offers);

        if (state.requestedOffer) {
          state.requestedOffer.isFavorite = false;
        }

        if (state.nearPlaces.length) {
          state.nearPlaces = clearFavorites(state.nearPlaces);
        }
      })
      .addCase(requestNearPlacesAction.pending, (state) => {
        state.isNearPlacesLoading = true;
        state.nearPlaces = [];
      })
      .addCase(requestNearPlacesAction.fulfilled, (state, action) => {
        state.isNearPlacesLoading = false;
        state.nearPlaces = action.payload;
      })
      .addCase(requestNearPlacesAction.rejected, (state) => {
        state.isNearPlacesLoading = false;
      })
      .addCase(requestReviewsForOfferAction.pending, (state) => {
        state.isReviewsLoading = true;
        state.reviews = [];
      })
      .addCase(requestReviewsForOfferAction.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(requestReviewsForOfferAction.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(requestStandaloneOfferAction.pending, (state) => {
        state.isStandaloneOfferLoading = true;
        state.isNotFoundError = false;
        state.requestedOffer = null;
      })
      .addCase(requestStandaloneOfferAction.fulfilled, (state, action) => {
        state.isStandaloneOfferLoading = false;
        state.requestedOffer = action.payload;
      })
      .addCase(requestStandaloneOfferAction.rejected, (state) => {
        state.isStandaloneOfferLoading = false;
        state.isNotFoundError = true;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isCommentProcessing = true;
        state.isCommentDelivered = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.isCommentProcessing = false;
        state.isCommentDelivered = true;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isCommentProcessing = false;
      });
  },
});

export {appData};
