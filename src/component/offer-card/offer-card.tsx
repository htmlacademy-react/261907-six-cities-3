import {Link} from 'react-router-dom';
import cn from 'classnames';
import {AppRoute, BookMarkButtonClass, CardClass} from '../../const';
import {capitalize} from '../../utils/utils';
import {Offer} from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';

type OfferCardProps = {
  offer: Offer;
  className: CardClass;
  onOfferEnter?: () => void;
  onOfferLeave?: () => void;
};

function OfferCard({offer, className, onOfferEnter, onOfferLeave}: OfferCardProps): JSX.Element {
  return (
    <article
      className={`${className}__card  place-card`}
      onMouseEnter={onOfferEnter}
      onMouseLeave={onOfferLeave}
      data-testid='offer-card'
    >
      {offer.isPremium && <div className='place-card__mark'><span>Premium</span></div>}
      <div className={`${className}__image-wrapper  place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className='place-card__image'
            src={offer.previewImage} width={className !== CardClass.Favorites ? '260' : '150'}
            height={className !== CardClass.Favorites ? '200' : '100'}
            alt='Place image'
          />
        </Link>
      </div>
      <div
        className={cn(
          'place-card__info',
          {'favorites__card-info': className === CardClass.Favorites}
        )}
      >
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <BookmarkButton className={BookMarkButtonClass.PlaceCard} isFavorite={offer.isFavorite} id={offer.id} />
        </div>
        <div className='place-card__rating  rating'>
          <div className='place-card__stars  rating__stars'>
            <span style={{width: `${Math.round(offer.rating) * 20}%`}} data-testid={offer.rating}/>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
