import {PropsWithChildren} from 'react';
import {Offer} from '../../types/offer';
import Sort from '../sort/sort';

type CityOffersProps = PropsWithChildren<{
  city: string;
  offers: Offer[];
}>;

function CityOffers({city, offers, children}: CityOffersProps): JSX.Element {
  return (
    <section className='cities__places  places'>
      <h2 className='visually-hidden'>Places</h2>
      <b className='places__found'>{offers.length} places to stay in {city}</b>
      <Sort />
      {children}
    </section>
  );
}

export default CityOffers;
