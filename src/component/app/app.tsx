import {Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {getOffersLoadingStatus} from '../../store/app-data/app-data.selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRoute from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
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
              <OfferScreen />
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRoute>
    </HelmetProvider>
  );
}

export default App;
