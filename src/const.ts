const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const ERROR_TIMEOUT = 2000;

const REQUEST_TIMEOUT = 5000;

const URL_MARKER = '/img/pin.svg';

const URL_MARKER_ACTIVE = '/img/pin-active.svg';

enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
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

enum MapClass {
  Cities = 'cities',
  Offer = 'offer'
}

enum Rating {
  Terribly = 'terribly',
  Badly = 'badly',
  NotBad = 'not bad',
  Good = 'good',
  Perfect = 'perfect'
}

enum Sorting {
  Popular = 'Popular',
  PriceAsc = 'Price: low to high',
  PriceDesc = 'Price: high to low',
  TopRated = 'Top rated first'
}

export {
  BACKEND_URL,
  CITIES,
  ERROR_TIMEOUT,
  REQUEST_TIMEOUT,
  URL_MARKER,
  URL_MARKER_ACTIVE,
  ApiRoute,
  AppRoute,
  AuthorizationStatus,
  BookMarkButtonClass,
  CardClass,
  MapClass,
  Rating,
  Sorting
};
