import {datatype} from 'faker';
import {Offer, StandaloneOffer} from '../../types/offer';
import {Review} from '../../types/review';
import {makeMockFavorite, makeMockOffer, makeMockReview, makeMockStandaloneOffer} from '../../utils/mocks';
import {appData} from './app-data.slice';
import {changeFavoriteStatusAction, getFavoritesAction, getOffersAction, logoutAction, requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction, sendCommentAction} from '../api-action';
import { extractOfferFromFavorite } from '../../utils/offers';

describe('App Data Slice', () => {
  const emptyAction = {type: ''};
  const mockOffer: Offer = makeMockOffer();
  const mockReview: Review = makeMockReview();
  const mockStandaloneOffer: StandaloneOffer = makeMockStandaloneOffer();

  const state = {
    favorites: [mockOffer],
    isCommentDelivered: datatype.boolean(),
    isCommentProcessing: datatype.boolean(),
    isFavoritesLoading: datatype.boolean(),
    isFavoriteProcessing: datatype.boolean(),
    isNearPlacesLoading: datatype.boolean(),
    isOffersLoading: datatype.boolean(),
    isNotFoundError: datatype.boolean(),
    isReviewsLoading: datatype.boolean(),
    isStandaloneOfferLoading: datatype.boolean(),
    nearPlaces: [mockOffer],
    offers:[mockOffer],
    requestedOffer: mockStandaloneOffer,
    reviews: [mockReview]
  };

  const initialState = {
    favorites: [],
    isCommentDelivered: false,
    isCommentProcessing: false,
    isFavoriteProcessing: false,
    isFavoritesLoading: false,
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

  it('should return initial state with empty action', () => {
    const result = appData.reducer(state, emptyAction);

    expect(result).toEqual(state);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set isFavoriteProcessing to true with changeFavoriteStatusAction.pending', () => {
    const expectedState = {
      ...state,
      isFavoriteProcessing: true
    };

    const result = appData.reducer(state, changeFavoriteStatusAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isFavoriteProcessing to false, updateFavorites with changeFavoriteStatusAction.fulfilled', () => {
    const mockFavorite = makeMockFavorite();
    const offerToAdd = extractOfferFromFavorite(mockFavorite);

    const expectedState = {
      ...state,
      favorites: [mockOffer, offerToAdd],
      isFavoriteProcessing: false
    };

    const result = appData.reducer(state, changeFavoriteStatusAction.fulfilled(
      mockFavorite,
      '',
      {
        id: mockOffer.id,
        status: Number(!mockOffer.isFavorite)
      }
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isFavoriteProcessing to false with changeFavoriteStatusAction.rejected', () => {
    const expectedState = {
      ...state,
      isFavoriteProcessing: false
    };

    const result = appData.reducer(state, changeFavoriteStatusAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should check and update isFavorite on offers with getFavoritesAction.fulfilled', () => {
    const updatedOffer = {
      ...mockOffer,
      isFavorite: true
    };

    const expectedState = {
      ...state,
      favorites: [updatedOffer],
      offers: [updatedOffer],
      isFavoritesLoading: false
    };

    const result = appData.reducer(state, getFavoritesAction.fulfilled(
      [updatedOffer],
      '',
      undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to true and isNotFoundError to false with getOffersAction.pending', () => {
    const expectedState = {
      ...state,
      isOffersLoading: true,
      isNotFoundError: false
    };

    const result = appData.reducer(state, getOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to false, offers and favorite offers with getOffersAction.fulfilled', () => {
    const favoriteOffer = {
      ...mockOffer,
      isFavorite: true
    };

    const expectedState = {
      ...initialState,
      offers: [favoriteOffer],
      favorites: [favoriteOffer]
    };

    const result = appData.reducer(undefined, getOffersAction.fulfilled(
      [favoriteOffer],
      '',
      undefined
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isOffersLoading to false, isNotFoundError to true, and offers to empty array with getOffersAction.rejected', () => {
    const expectedState = {
      ...state,
      isOffersLoading: false,
      isNotFoundError: true,
      offers: []
    };

    const result = appData.reducer(state, getOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should clear favorites with logoutAction.fulfilled', () => {
    const updatedOffer = {
      ...mockOffer,
      isFavorite: false
    };

    const updatedStandaloneOffer = {
      ...mockStandaloneOffer,
      isFavorite: false
    };

    const expectedState = {
      ...state,
      offers: [updatedOffer],
      nearPlaces: [updatedOffer],
      requestedOffer: updatedStandaloneOffer
    };

    const result = appData.reducer(state, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set isNearPlacesLoading to true and nearPlaces to empty array with requestNearPlacesAction.pending', () => {
    const expectedState = {
      ...state,
      isNearPlacesLoading: true,
      nearPlaces: []
    };

    const result = appData.reducer(state, requestNearPlacesAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isNearPlacesLoading to false and nearPlaces with requestNearPlacesAction.fulfilled', () => {
    const pendingState = {
      ...state,
      isNearPlacesLoading: true,
      nearPlaces: []
    };

    const expectedState = {
      ...pendingState,
      isNearPlacesLoading: false,
      nearPlaces: [mockOffer]
    };

    const result = appData.reducer(state, requestNearPlacesAction.fulfilled(
      [mockOffer],
      '',
      mockStandaloneOffer.id
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isNearPlacesLoading to false with requestNearPlacesAction.rejected', () => {
    const expectedState = {
      ...state,
      isNearPlacesLoading: false
    };

    const result = appData.reducer(state, requestNearPlacesAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isReviewsLoading to true and reviews to empty array with requestReviewsForOfferAction.pending', () => {
    const expectedState = {
      ...state,
      isReviewsLoading: true,
      reviews: []
    };

    const result = appData.reducer(state, requestReviewsForOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isReviewsLoading to false and reviews with requestReviewsForOfferAction.fulfilled', () => {
    const pendingState = {
      ...state,
      isReviewsLoading: true,
      reviews: []
    };

    const expectedState = {
      ...pendingState,
      isReviewsLoading: false,
      reviews: [mockReview]
    };

    const result = appData.reducer(state, requestReviewsForOfferAction.fulfilled(
      [mockReview],
      '',
      mockStandaloneOffer.id
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isReviewsLoading to false with requestReviewsForOfferAction.rejected', () => {
    const expectedState = {
      ...state,
      isReviewsLoading: false
    };

    const result = appData.reducer(state, requestReviewsForOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isStandaloneOfferLoading to true, isNotFoundError to false and requestedOffer to null with requestStandaloneOfferAction.pending', () => {
    const expectedState = {
      ...state,
      isStandaloneOfferLoading: true,
      isNotFoundError: false,
      requestedOffer: null
    };

    const result = appData.reducer(state, requestStandaloneOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isStandaloneOfferLoading to false and requestedOffer with requestStandaloneOfferAction.fulfilled', () => {
    const pendingState = {
      ...state,
      isStandaloneOfferLoading: true,
      requestedOffer: null
    };

    const expectedState = {
      ...pendingState,
      isStandaloneOfferLoading: false,
      requestedOffer: mockStandaloneOffer
    };

    const result = appData.reducer(state, requestStandaloneOfferAction.fulfilled(
      mockStandaloneOffer,
      '',
      mockStandaloneOffer.id
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isStandaloneOfferLoading to false and isNotFoundError to true with requestStandaloneOfferAction.rejected', () => {
    const expectedState = {
      ...state,
      isStandaloneOfferLoading: false,
      isNotFoundError: true
    };

    const result = appData.reducer(state, requestStandaloneOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set isCommentProcessing to true and isCommentDelivered to false with sendCommentAction.pending', () => {
    const expectedState = {
      ...state,
      isCommentProcessing: true,
      isCommentDelivered: false
    };

    const result = appData.reducer(state, sendCommentAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set isCommentProcessing to false and isCommentDelivered to true and update reviews with sendCommentAction.fulfilled', () => {
    const expectedState = {
      ...state,
      isCommentProcessing: false,
      isCommentDelivered: true,
      reviews: [mockReview, mockReview]
    };

    const result = appData.reducer(state, sendCommentAction.fulfilled(
      mockReview,
      '',
      {
        id: mockStandaloneOffer.id,
        commentData: {
          comment: mockReview.comment,
          rating: mockReview.rating
        }
      }
    ));

    expect(result).toEqual(expectedState);
  });

  it('should set isCommentProcessing to false with sendCommentAction.rejected', () => {
    const expectedState = {
      ...state,
      isCommentProcessing: false
    };

    const result = appData.reducer(state, sendCommentAction.rejected);

    expect(result).toEqual(expectedState);
  });
});
