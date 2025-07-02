const URL_MARKER = '/img/pin.svg';

const URL_MARKER_ACTIVE = '/img/pin-active.svg';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum BookMarkButtonClass {
  PlaceCard = 'place-card',
  Offer = 'offer'
}

enum CardClass {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places'
}

const Rating = {
  Perfect: '5',
  Good: '4',
  NotBad: '3',
  Badly: '2',
  Terribly: '1'
} as const;

export {
  URL_MARKER,
  URL_MARKER_ACTIVE,
  AppRoute,
  AuthorizationStatus,
  BookMarkButtonClass,
  CardClass,
  Rating
};
