import {Offer} from '../types/offer';

const offers: Offer[] = [
  {
    id: '0',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://images.wallpaperscraft.com/image/single/room_interior_comfort_156500_1024x768.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
      isPro: false
    },
    images: [
      'https://images.wallpaperscraft.com/image/single/room_interior_comfort_156500_1024x768.jpg'
    ],
    maxAdults: 4
  },
  {
    id: '1',
    title: 'Nice & cozy room at Amsterdam',
    type: 'room',
    price: 50,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'https://images.wallpaperscraft.com/image/single/lamp_reflection_mirror_1005852_1024x768.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [
      'Wifi',
      'Cable TV'
    ],
    host: {
      name: 'Midoriya Izuku',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
      isPro: false
    },
    images: [
      'https://images.wallpaperscraft.com/image/single/lamp_reflection_mirror_1005852_1024x768.jpg'
    ],
    maxAdults: 8
  },
  {
    id: '2',
    title: 'Giant House for Rich People',
    type: 'house',
    price: 10000,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 1,
    previewImage: 'https://images.wallpaperscraft.com/image/single/city_china_house_807_1024x768.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 50,
    goods: [
      'Wifi',
      'Heating',
      'Kitchen',
      'Cable TV',
      'Spa',
      'Gold',
      'Food',
      'Drinks'
    ],
    host: {
      name: 'King of China',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png',
      isPro: true
    },
    images: [
      'https://images.wallpaperscraft.com/image/single/city_china_house_807_1024x768.jpg'
    ],
    maxAdults: 10
  },
  {
    id: '3',
    title: 'Hotel in Amterdam',
    type: 'hotel',
    price: 500,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: 'https://images.wallpaperscraft.com/image/single/hotel_room_bed_39745_1024x768.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [
      'Parking'
    ],
    host: {
      name: 'Mr. Hotel',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_9.png',
      isPro: true
    },
    images: [
      'https://images.wallpaperscraft.com/image/single/hotel_room_bed_39745_1024x768.jpg'
    ],
    maxAdults: 3
  }
];

export {offers};
