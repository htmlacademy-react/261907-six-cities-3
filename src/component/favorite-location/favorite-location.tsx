import {PointerEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute, CardClass} from '../../const';
import {LocationWithOffers} from '../../types/offer';
import {useAppDispatch} from '../../hooks';
import {changeCityAction} from '../../store/action';
import OfferCard from '../offer-card/offer-card';

type FavoriteLocationProps = {
  location: LocationWithOffers;
};

function FavoriteLocation({location}: FavoriteLocationProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCityPick = (evt: PointerEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCityAction({city: location.name}));
    navigate(AppRoute.Main);
  };

  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations  locations  locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#' onClick={handleCityPick}>
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
