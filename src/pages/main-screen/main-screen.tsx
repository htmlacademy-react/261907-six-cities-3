import {useState} from 'react';
import cn from 'classnames';
import {CardClass, MapClass, Sorting} from '../../const';
import {updateOffersToRender} from '../../utils';
import {useAppSelector} from '../../hooks';
import Header from '../../component/header/header';
import UserInfo from '../../component/user-info/user-info';
import LocationsList from '../../component/locations-list/location-list';
import CityEmpty from '../../component/city-empty/city-empty';
import Map from '../../component/map/map';
import CityOffers from '../../component/city-offers/city-offers';
import Sort from '../../component/sort/sort';
import OffersList from '../../component/offers-list/offers-list';

function MainScreen(): JSX.Element {
  const [enteredOffer, setEnteredOffer] = useState('');
  const [sorting, setSorting] = useState(Sorting.Popular);
  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.city);
  const offersToRender = updateOffersToRender(offers, activeCity, sorting);

  const handleSortingChange = (requestedSorting: Sorting) => {
    setSorting(requestedSorting);
  };

  const handleOfferEnter = (offerId: string) => {
    setEnteredOffer(offerId);
  };

  const handleOfferLeave = () => {
    setEnteredOffer('');
  };

  return (
    <div className='page  page--gray  page--main'>
      <Header>
        <UserInfo />
      </Header>
      <main
        className={cn(
          'page__main  page__main--index',
          {'page__main--index-empty': !offersToRender.length}
        )}
      >
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations  container'>
            <LocationsList />
          </section>
        </div>
        <div className='cities'>
          <div
            className={cn(
              'cities__places-container  container',
              {'cities__places-container--empty': !offersToRender.length}
            )}
          >
            {offersToRender.length
              ? (
                <CityOffers city={activeCity} offers={offersToRender}>
                  <Sort sorting={sorting} onSortingChange={handleSortingChange} />
                  <OffersList
                    className={CardClass.Cities}
                    offers={offersToRender}
                    onOfferEnter={handleOfferEnter}
                    onOfferLeave={handleOfferLeave}
                  />
                </CityOffers>
              )
              : <CityEmpty />}
            <div className='cities__right-section'>
              {Boolean(offersToRender.length) && <Map className={MapClass.Cities} offers={offersToRender} enteredOffer={enteredOffer} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
