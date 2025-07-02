import {useParams} from 'react-router-dom';
import cn from 'classnames';
import {BookMarkButtonClass, CardClass} from '../../const';
import {capitalize} from '../../utils';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Logo from '../../component/logo/logo';
import BookmarkButton from '../../component/bookmark-button/bookmark-button';
import ReviewCard from '../../component/review-card/review-card';
import CommentForm from '../../component/comment-form/comment-form';
import OfferCard from '../../component/offer-card/offer-card';

type OfferScreenProps ={
  offers: Offer[];
  reviews: Review[];
};

function OfferScreen({offers, reviews}: OfferScreenProps): JSX.Element {
  const params = useParams();

  const requiredOffer: Offer | undefined = offers.find(({id}: Offer) => id === params.id);

  if (!requiredOffer) {
    return <NotFoundScreen />;
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <Logo />
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item  user'>
                  <a className='header__nav-link  header__nav-link--profile' href='#'>
                    <div className='header__avatar-wrapper  user__avatar-wrapper'>
                    </div>
                    <span className='header__user-name  user__name'>Oliver.conner@gmail.com</span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
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
                <ul className='reviews__list'>
                  {reviews.map((review) => <ReviewCard key={review.id} review={review}/>)}
                </ul>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className='offer__map  map' />
        </section>
        <div className='container'>
          <section className='near-places  places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list  places__list'>
              {offers.map((offer) => offer !== requiredOffer && <OfferCard key={offer.id} offer={offer} className={CardClass.NearPlaces} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
