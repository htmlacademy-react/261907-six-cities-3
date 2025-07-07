import cn from 'classnames';
import {CardClass} from '../../const';
import {Offer} from '../../types/offer';
import OfferCard from '../../component/offer-card/offer-card';

type OffersListProps = {
  className: CardClass;
  offers: Offer[];
  onOfferEnter?: (offerId: string) => void;
  onOfferLeave?: () => void;
}

function OffersList({className, offers, onOfferEnter, onOfferLeave}: OffersListProps): JSX.Element {
  return (
    <div
      className={cn(
        'places__list',
        {
          [`${className}__places-list  tabs__content`]: className === CardClass.Cities,
          [`${className}__list`]: className === CardClass.NearPlaces
        }
      )}
      data-testid='offers-list'
    >
      {offers.map((offer: Offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          className={className}
          onOfferEnter={() => {
            if (onOfferEnter) {
              onOfferEnter(offer.id);
            }
          }}
          onOfferLeave={onOfferLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
