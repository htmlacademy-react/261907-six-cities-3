import {CardClass} from '../../const';
import {LocationWithOffers} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoriteLocationProps = {
  location: LocationWithOffers;
};

function FavoriteLocation({location}: FavoriteLocationProps) {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations  locations  locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#'>
            <span>{location.name}</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        {location.offers.map((offer) => <OfferCard key={offer.id} offer={offer} className={CardClass.Favorites} />)}
      </div>
    </li>
  );
}

export default FavoriteLocation;
