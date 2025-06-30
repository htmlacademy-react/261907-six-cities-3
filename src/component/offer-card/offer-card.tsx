import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {capitalize} from '../../utils';
import {Offer} from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  isDefaultView: boolean;
  onActivation?: () => void;
};

function OfferCard({offer, isDefaultView, onActivation}: OfferCardProps): JSX.Element {
  return (
    <article
      className={`${isDefaultView ? 'cities' : 'favorites'}__card  place-card`}
      onMouseEnter={() => {
        if (onActivation) {
          onActivation();
        }
      }}
    >
      {offer.isPremium ?
        <div className='place-card__mark'>
          <span>Premium</span>
        </div> :
        null}
      <div className={`${isDefaultView ? 'cities' : 'favorites'}__image-wrapper  place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', offer.id)}>
          <img
            className='place-card__image'
            src={offer.previewImage} width={isDefaultView ? '260' : '150'}
            height={isDefaultView ? '200' : '100'}
            alt='Place image'
          />
        </Link>
      </div>
      <div className={`place-card__info${isDefaultView ? '' : '  favorites__card-info'}`}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button  button${offer.isFavorite ? '  place-card__bookmark-button--active' : ''}`} type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating  rating'>
          <div className='place-card__stars  rating__stars'>
            <span style={{width: `${offer.rating * 20}%`}} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{capitalize(offer.type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
