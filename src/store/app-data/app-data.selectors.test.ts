import {datatype} from 'faker';
import {NameSpace} from '../../const';
import {Offer, StandaloneOffer} from '../../types/offer';
import {Review} from '../../types/review';
import {makeMockOffer, makeMockReview, makeMockStandaloneOffer} from '../../utils/mocks';
import {getCommentDeliveringStatus, getCommentProcessingStatus, getFavoriteProcessingStatus, getFavoritesLoadingStatus, getNearPlaces, getNearPlacesLoadingStatus, getNotFoundErrorStatus, getOffers, getOffersLoadingStatus, getReviews, getReviewsLoadingStatus, getStandaloneOffer, getStandaloneOfferLoadingStatus} from './app-data.selectors';

describe('App Data Selectors', () => {
  const mockOffer: Offer = makeMockOffer();
  const mockReview: Review = makeMockReview();
  const mockStandaloneOffer: StandaloneOffer = makeMockStandaloneOffer();

  const state = {
    [NameSpace.Data]: {
      favorites: [mockOffer],
      isCommentDelivered: datatype.boolean(),
      isCommentProcessing: datatype.boolean(),
      isFavoriteProcessing: datatype.boolean(),
      isFavoritesLoading: datatype.boolean(),
      isNearPlacesLoading: datatype.boolean(),
      isOffersLoading: datatype.boolean(),
      isNotFoundError: datatype.boolean(),
      isReviewsLoading: datatype.boolean(),
      isStandaloneOfferLoading: datatype.boolean(),
      nearPlaces: [mockOffer],
      offers: [mockOffer],
      requestedOffer: mockStandaloneOffer,
      reviews: [mockReview]
    }
  };

  it('should return comment delivering status', () => {
    const {isCommentDelivered} = state[NameSpace.Data];
    const result = getCommentDeliveringStatus(state);

    expect(result).toBe(isCommentDelivered);
  });

  it('should return comment processing status', () => {
    const {isCommentProcessing} = state[NameSpace.Data];
    const result = getCommentProcessingStatus(state);

    expect(result).toBe(isCommentProcessing);
  });

  it('should return favorite processing status', () => {
    const {isFavoriteProcessing} = state[NameSpace.Data];
    const result = getFavoriteProcessingStatus(state);

    expect(result).toBe(isFavoriteProcessing);
  });

  it('should return favorites from state', () => {
    const {favorites} = state[NameSpace.Data];
    const result = getNearPlaces(state);

    expect(result).toEqual(favorites);
  });

  it('should return favorites loading status from state', () => {
    const {isFavoritesLoading} = state[NameSpace.Data];
    const result = getFavoritesLoadingStatus(state);

    expect(result).toEqual(isFavoritesLoading);
  });

  it('should return near places from state', () => {
    const {nearPlaces} = state[NameSpace.Data];
    const result = getNearPlaces(state);

    expect(result).toEqual(nearPlaces);
  });

  it('should return near places loading status from state', () => {
    const {isNearPlacesLoading} = state[NameSpace.Data];
    const result = getNearPlacesLoadingStatus(state);

    expect(result).toBe(isNearPlacesLoading);
  });

  it('should return not found error status from state', () => {
    const {isNotFoundError} = state[NameSpace.Data];
    const result = getNotFoundErrorStatus(state);

    expect(result).toBe(isNotFoundError);
  });

  it('should return offers from state', () => {
    const {offers} = state[NameSpace.Data];
    const result = getOffers(state);

    expect(result).toEqual(offers);
  });

  it('should return offers loading status from state', () => {
    const {isOffersLoading} = state[NameSpace.Data];
    const result = getOffersLoadingStatus(state);

    expect(result).toBe(isOffersLoading);
  });

  it('should return reviews from state', () => {
    const {reviews} = state[NameSpace.Data];
    const result = getReviews(state);

    expect(result).toEqual(reviews);
  });

  it('should return reviews loading status from state', () => {
    const {isReviewsLoading} = state[NameSpace.Data];
    const result = getReviewsLoadingStatus(state);

    expect(result).toBe(isReviewsLoading);
  });

  it('should return requested offer from state', () => {
    const {requestedOffer} = state[NameSpace.Data];
    const result = getStandaloneOffer(state);

    expect(result).toEqual(requestedOffer);
  });

  it('should return requested offer loading status from state', () => {
    const {isStandaloneOfferLoading} = state[NameSpace.Data];
    const result = getStandaloneOfferLoadingStatus(state);

    expect(result).toBe(isStandaloneOfferLoading);
  });
});
