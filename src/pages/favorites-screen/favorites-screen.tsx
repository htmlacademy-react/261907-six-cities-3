import cn from 'classnames';
import {Offer} from '../../types/offer';
import {findFavorites, sortOffersByLocation} from '../../utils';
import {useAppSelector} from '../../hooks';
import Header from '../../component/header/header';
import UserInfo from '../../component/user-info/user-info';
import FavoriteLocation from '../../component/favorite-location/favorite-location';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function FavoritesScreen() {
  const offers: Offer[] = useAppSelector((state) => state.offers);
  const favoriteOffers: Offer[] = findFavorites(offers);
  const sortedOffers = sortOffersByLocation(favoriteOffers);

  return (
    <div
      className={cn(
        'page',
        {'page--favorites-empty': !sortedOffers.length}
      )}
    >
      <Header>
        <UserInfo />
      </Header>
      <main
        className={cn(
          'page__main  page__main--favorites',
          {'page__main--favorites-empty': !sortedOffers.length}
        )}
      >
        <div className='page__favorites-container  container'>
          <section
            className={cn(
              'favorites',
              {'favorites--empty': !sortedOffers.length}
            )}
          >
            <h1 className={sortedOffers.length ? 'favorites__title' : 'visually-hidden'}>
              {sortedOffers.length ? 'Saved listing' : 'Favorites (empty)'}
            </h1>
            {sortedOffers.length
              ? (
                <ul className='favorites__list'>
                  {sortedOffers.map((location) => <FavoriteLocation key={location.name} location={location}/>)}
                </ul>
              )
              : (
                <div className='favorites__status-wrapper'>
                  <b className='favorites__status'>Nothing yet saved.</b>
                  <p className='favorites__status-description'>Save properties to narrow down search or plan your future trips.</p>
                </div>
              )}
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link className='footer__logo-link' to={AppRoute.Main}>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
