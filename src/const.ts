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

const Rating = {
  Perfect: '5',
  Good: '4',
  NotBad: '3',
  Badly: '2',
  Terribly: '1'
} as const;

export {
  AppRoute,
  AuthorizationStatus,
  Rating
};
