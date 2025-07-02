import {CardClass} from '../../const';
import {Offer} from '../../types/offer';
import OffersList from '../offers-list/offers-list';

type CityOffersProps = {
  city: string;
  offers: Offer[];
  handleOfferEnter: (offerId: string) => void;
};

function CityOffers({city, offers, handleOfferEnter}: CityOffersProps): JSX.Element {
  return (
    <section className='cities__places  places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>{offers.length} places to stay in {city}</b>
      <form className='places__sorting' action='#' method='get'>
        <span className='places__sorting-caption'>Sort by</span>
        <span className='places__sorting-type' tabIndex={0}>
          Popular
          <svg className='places__sorting-arrow' width='7' height='4'>
            <use xlinkHref='#icon-arrow-select' />
          </svg>
        </span>
        <ul className='places__options  places__options--custom  places__options--opened'>
          <li className='places__option  places__option--active' tabIndex={0}>Popular</li>
          <li className='places__option' tabIndex={0}>Price: low to high</li>
          <li className='places__option' tabIndex={0}>Price: high to low</li>
          <li className='places__option' tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <OffersList
        className={CardClass.Cities}
        offers={offers}
        onOfferEnter={handleOfferEnter}
      />
    </section>
  );
}

export default CityOffers;
