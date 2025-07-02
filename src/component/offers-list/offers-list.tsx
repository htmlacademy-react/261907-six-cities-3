import {CardClass} from '../../const';
import {Offer} from '../../types/offer';
import OfferCard from '../../component/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onOfferEnter: (offerId: string) => void;
}

function OffersList({offers, onOfferEnter}: OffersListProps): JSX.Element {
  return (
    <div className='cities__places-list  places__list  tabs__content'>
      {offers.map((offer: Offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          className={CardClass.Cities}
          onOfferEnter={() => {
            onOfferEnter(offer.id);
          }}
        />
      ))}
    </div>
  );
}

export default OffersList;
