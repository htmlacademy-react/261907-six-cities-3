const OFFERS_COUNT = 420;

const Setting = {
  OffersPerPage: 5
};

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

export {
  OFFERS_COUNT,
  Setting,
  AppRoute,
  AuthorizationStatus
};
