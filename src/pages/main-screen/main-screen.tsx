import {useState} from 'react';
import cn from 'classnames';
import {MapClass} from '../../const';
import {Offer} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCityAction} from '../../store/action';
import Logo from '../../component/logo/logo';
import LocationsList from '../../component/locations-list/location-list';
import CityEmpty from '../../component/city-empty/city-empty';
import Map from '../../component/map/map';
import CityOffers from '../../component/city-offers/city-offers';

function MainScreen(): JSX.Element {
  const [enteredOffer, setEnteredOffer] = useState('');
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const activeOffers = offers.filter((offer: Offer) => offer.city.name === activeCity);

  const handleChangeCity = (city: string) => {
    dispatch(changeCityAction({city}));
  };

  const handleOfferEnter = (offerId: string) => {
    setEnteredOffer(offerId);
  };

  return (
    <div className='page  page--gray  page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <Logo />
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item  user'>
                  <a className='header__nav-link  header__nav-link--profile' href='#'>
                    <div className='header__avatar-wrapper  user__avatar-wrapper' />
                    <span className='header__user-name  user__name'>Oliver.conner@gmail.com</span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main
        className={cn(
          'page__main  page__main--index',
          {'page__main--index-empty': !activeOffers.length}
        )}
      >
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations  container'>
            <LocationsList activeCity={activeCity} onCityPick={handleChangeCity}/>
          </section>
        </div>
        <div className='cities'>
          <div
            className={cn(
              'cities__places-container  container',
              {'cities__places-container--empty': !activeOffers.length}
            )}
          >
            {activeOffers.length
              ? <CityOffers city={activeCity} offers={activeOffers} handleOfferEnter={handleOfferEnter} />
              : <CityEmpty />}
            <div className='cities__right-section'>
              {Boolean(activeOffers.length) && <Map className={MapClass.Cities} offers={activeOffers} enteredOffer={enteredOffer} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
