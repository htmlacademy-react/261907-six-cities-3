import {AuthorizationStatus} from '../const';
import {Offer, StandaloneOffer} from './offer';
import {UserData} from './user';
import {Review} from './review';
import {store} from '../store';

export type InitialState = {
  city: string;
  offers: Offer[];
  error: string | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  requestedOffer: StandaloneOffer | null;
  reviews: Review[];
  isStandaloneOfferLoading: boolean;
  isReviewsLoading: boolean;
  isNearPlacesLoading: boolean;
  nearPlaces: Offer[];
  isOfferNotFound: boolean;
  isFavoriteProcessing: boolean;
  isCommentProcessing: boolean;
  isUserProcessing: boolean;
  favorites: Offer[];
  isFavoritesLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
