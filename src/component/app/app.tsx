import {Routes, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Review} from '../../types/review';
import {useAppSelector} from '../../hooks';
import browserHistory from '../../browser-history';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRoute from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppProps = {
  reviews: Review[];
}

function App({reviews}: AppProps): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRoute history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={
            <OfferScreen
              reviews={reviews}
            />
          }
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRoute>
  );
}

export default App;
