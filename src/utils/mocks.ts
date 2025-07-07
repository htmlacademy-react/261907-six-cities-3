import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {address, datatype, date, internet, lorem, name} from 'faker';
import {CITIES, AuthorizationStatus} from '../const';
import {Offer, StandaloneOffer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user';
import {State} from '../types/state';
import {createApi} from '../services/api';

type MockApartmentType = ['apartment', 'hotel', 'house', 'room'];

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

const apartmentTypes: MockApartmentType = ['apartment', 'hotel', 'house', 'room'];

function extractActionsTypes(actions: Action<string>[]): string[] {
  return actions.map(({type}) => type);
}

function makeMockOffer(): Offer {
  return {
    id: datatype.uuid(),
    title: lorem.words(),
    type: apartmentTypes[datatype.number(3)],
    price: datatype.number(55555),
    city: {
      name: CITIES[datatype.number(5)],
      location: {
        latitude: Number(address.latitude()),
        longitude: Number(address.longitude()),
        zoom: datatype.number(10)
      }
    },
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(10)
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({min: 1, max: 5}),
    previewImage: internet.url()
  };
}

function makeMockReview(): Review {
  return {
    id: datatype.uuid(),
    date: date.past().toISOString(),
    user: {
      name: name.firstName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean()
    },
    comment: lorem.sentences(),
    rating: datatype.number({min: 1, max: 5})
  };
}

function makeMockStandaloneOffer(): StandaloneOffer {
  const mockOffer: Omit<Offer, 'previewImage'> = makeMockOffer();

  return {
    ...mockOffer,
    description: lorem.sentences(),
    bedrooms: datatype.number(10),
    goods: [
      lorem.word()
    ],
    host: {
      name: name.firstName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean()
    },
    images: [
      internet.url()
    ],
    maxAdults: datatype.number(10)
  };
}

function makeMockUser(): UserData {
  return {
    email: internet.email(),
    token: datatype.uuid(),
    name: name.firstName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  };
}

function makeMockStore(initialState?: Partial<State>): State {
  return {
    APP: {
      city: CITIES[datatype.number(5)]
    },
    DATA: {
      isCommentProcessing: false,
      isFavoriteProcessing: false,
      isNearPlacesLoading: false,
      isOffersLoading: false,
      isOfferNotFound: false,
      isReviewsLoading: false,
      isStandaloneOfferLoading: false,
      nearPlaces: [makeMockOffer()],
      offers:[makeMockOffer()],
      requestedOffer: makeMockStandaloneOffer(),
      reviews: [makeMockReview()]
    },
    USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isUserProcessing: false,
      user: makeMockUser()
    },
    ...initialState ?? {}
  };
}

export {
  extractActionsTypes,
  makeMockOffer,
  makeMockReview,
  makeMockStandaloneOffer,
  makeMockUser,
  makeMockStore
};
