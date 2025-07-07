import {CardClass} from '../../const';
import {LocationWithOffers} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import LinkToCity from '../link-to-city/link-to-city';

type FavoriteLocationProps = {
  location: LocationWithOffers;
};

function FavoriteLocation({location}: FavoriteLocationProps) {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations  locations  locations--current'>
        <div className='locations__item'>
          <LinkToCity city={location.name} />
        </div>
      </div>
      <div className='favorites__places' data-testid='favorites-places'>
        {location.offers.map((offer) => <OfferCard key={offer.id} offer={offer} className={CardClass.Favorites} />)}
      </div>
    </li>
  );
}

export default FavoriteLocation;
