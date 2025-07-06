import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {InitialState} from '../../types/state';
import {getOffersAction, requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction, sendCommentAction} from '../api-action';

const initialState: Pick<InitialState, 'isNearPlacesLoading' | 'isOffersLoading' | 'isOfferNotFound' | 'isReviewsLoading' | 'isStandaloneOfferLoading' | 'nearPlaces' |'offers' | 'requestedOffer' |'reviews'> = {
  isNearPlacesLoading: false,
  isOffersLoading: false,
  isOfferNotFound: false,
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
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
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
        state.isOfferNotFound = false;
        state.requestedOffer = null;
      })
      .addCase(requestStandaloneOfferAction.fulfilled, (state, action) => {
        state.isStandaloneOfferLoading = false;
        state.requestedOffer = action.payload;
      })
      .addCase(requestStandaloneOfferAction.rejected, (state) => {
        state.isStandaloneOfferLoading = false;
        state.isOfferNotFound = true;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.reviews = [...state.reviews, action.payload];
      });
  },
});

export {appData};
