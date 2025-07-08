import {memo, PointerEvent} from 'react';
import cn from 'classnames';
import {CardClass} from '../../const';
import {Offer} from '../../types/offer';
import OfferCard from '../../component/offer-card/offer-card';

type OffersListProps = {
  className: CardClass;
  offers: Offer[];
  onOfferEnter?: (evt: PointerEvent<HTMLElement>) => void;
  onOfferLeave?: () => void;
}

const MemorizedOfferCard = memo(OfferCard);

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
        <MemorizedOfferCard
          key={offer.id}
          offer={offer}
          className={className}
          onOfferEnter={onOfferEnter}
          onOfferLeave={onOfferLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
