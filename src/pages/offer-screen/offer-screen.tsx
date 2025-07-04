import {useParams} from 'react-router-dom';
import cn from 'classnames';
import {BookMarkButtonClass, CardClass, MapClass} from '../../const';
import {capitalize} from '../../utils';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {useAppSelector} from '../../hooks';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../component/header/header';
import UserInfo from '../../component/user-info/user-info';
import BookmarkButton from '../../component/bookmark-button/bookmark-button';
import ReviewsList from '../../component/reviews-list/reviews-list';
import CommentForm from '../../component/comment-form/comment-form';
import Map from '../../component/map/map';
import OffersList from '../../component/offers-list/offers-list';

type OfferScreenProps ={
  reviews: Review[];
};

function OfferScreen({reviews}: OfferScreenProps): JSX.Element {
  const params = useParams();
  const offers: Offer[] = useAppSelector((state) => state.offers);

  const requiredOffer: Offer | undefined = offers.find(({id}: Offer) => id === params.id);

  if (!requiredOffer) {
    return <NotFoundScreen />;
  }

  const nearPlaces: Offer[] = offers.filter((offer) => offer !== requiredOffer);

  return (
    <div className='page'>
      <Header>
        <UserInfo />
      </Header>
      <main className='page__main  page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container  container'>
            <div className='offer__gallery'>
              {requiredOffer.images.map((image) => (
                <div key={image} className='offer__image-wrapper'>
                  <img className='offer__image' src={image} alt='Photo studio' />
                </div>
              ))}
            </div>
          </div>
          <div className='offer__container  container'>
            <div className='offer__wrapper'>
              {requiredOffer.isPremium && <div className='offer__mark'><span>Premium</span></div>}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{requiredOffer.title}</h1>
                <BookmarkButton className={BookMarkButtonClass.Offer} isFavorite={requiredOffer.isFavorite} />
              </div>
              <div className='offer__rating  rating'>
                <div className='offer__stars  rating__stars'>
                  <span style={{width: `${requiredOffer.rating * 20}%`}} />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value  rating__value'>{requiredOffer.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature  offer__feature--entire'>
                  {capitalize(requiredOffer.type)}
                </li>
                <li className='offer__feature  offer__feature--bedrooms'>
                  {requiredOffer.bedrooms} Bedrooms
                </li>
                <li className='offer__feature  offer__feature--adults'>
                  Max {requiredOffer.maxAdults} adults
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{requiredOffer.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>What&apos;s inside</h2>
                <ul className='offer__inside-list'>
                  {requiredOffer.goods.map((good) => <li key={good} className='offer__inside-item'>{good}</li>)}
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user  user'>
                  <div
                    className={cn(
                      'offer__avatar-wrapper  user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': requiredOffer.host.isPro}
                    )}
                  >
                    <img className='offer__avatar user__avatar' src={requiredOffer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
                  </div>
                  <span className='offer__user-name'>{requiredOffer.host.name}</span>
                  {requiredOffer.host.isPro && <span className='offer__user-status'>Pro</span>}
                </div>
                <div className='offer__description'>
                  <p className='offer__text'>{requiredOffer.description}</p>
                </div>
              </div>
              <section className='offer__reviews  reviews'>
                <h2 className='reviews__title'>
                  Reviews &middot;
                  <span className='reviews__amount'>{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <Map className={MapClass.Offer} offers={nearPlaces} />
        </section>
        <div className='container'>
          <section className='near-places  places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OffersList className={CardClass.NearPlaces} offers={nearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
