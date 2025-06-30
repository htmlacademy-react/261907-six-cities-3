import {useState} from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../../component/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActive] = useState('');

  return (
    <div className='cities__places-list  places__list  tabs__content'>
      {offers.map((offer: Offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          isDefaultView
          onActivation={() => setActive(offer.id)}
        />
      ))}
    </div>
  );
}

export default OffersList;
