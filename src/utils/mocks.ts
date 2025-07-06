import {address, datatype, date, internet, lorem, name} from 'faker';
import {CITIES} from '../const';
import {Offer, StandaloneOffer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user';

type MockApartmentType = ['apartment', 'hotel', 'house', 'room'];

const apartmentTypes: MockApartmentType = ['apartment', 'hotel', 'house', 'room'];

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

export {
  makeMockOffer,
  makeMockReview,
  makeMockStandaloneOffer,
  makeMockUser
};
