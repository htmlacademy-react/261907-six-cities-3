import {datatype} from 'faker';
import {NameSpace} from '../../const';
import {Offer, StandaloneOffer} from '../../types/offer';
import {Review} from '../../types/review';
import {makeMockOffer, makeMockReview, makeMockStandaloneOffer} from '../../utils/mocks';
import {getNearPlaces, getNearPlacesLoadingStatus, getOfferErrorStatus, getOffers, getOffersLoadingStatus, getReviews, getReviewsLoadingStatus, getStandaloneOffer, getStandaloneOfferLoadingStatus} from './app-data.selectors';

describe('App Data Selectors', () => {
  const mockOffers: Offer[] = [makeMockOffer()];
  const mockReviews: Review[] = [makeMockReview()];
  const mockStandaloneOffer: StandaloneOffer = makeMockStandaloneOffer();

  const state = {
    [NameSpace.Data]: {
      isNearPlacesLoading: datatype.boolean(),
      isOffersLoading: datatype.boolean(),
      isOfferNotFound: datatype.boolean(),
      isReviewsLoading: datatype.boolean(),
      isStandaloneOfferLoading: datatype.boolean(),
      nearPlaces: mockOffers,
      offers: mockOffers,
      requestedOffer: mockStandaloneOffer,
      reviews: mockReviews
    }
  };

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

  it('should return offer error status from state', () => {
    const {isOfferNotFound} = state[NameSpace.Data];
    const result = getOfferErrorStatus(state);

    expect(result).toBe(isOfferNotFound);
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
