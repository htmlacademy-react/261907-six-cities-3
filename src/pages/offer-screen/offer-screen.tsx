import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import cn from 'classnames';
import {AuthorizationStatus, BookMarkButtonClass, CardClass, MapClass, MAX_IMAGES_TO_RENDER_IN_OFFER, MAX_NEAR_PLACES_TO_RENDER} from '../../const';
import {Offer, OfferLocationInfo} from '../../types/offer';
import {capitalize} from '../../utils/utils';
import {extractInfoForMap, prepareReviewsForRendering} from '../../utils/offers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getNearPlaces, getNearPlacesLoadingStatus, getOfferErrorStatus, getReviews, getReviewsLoadingStatus, getStandaloneOffer, getStandaloneOfferLoadingStatus} from '../../store/app-data/app-data.selectors';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {requestNearPlacesAction, requestReviewsForOfferAction, requestStandaloneOfferAction} from '../../store/api-action';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../component/header/header';
import BookmarkButton from '../../component/bookmark-button/bookmark-button';
import ReviewsList from '../../component/reviews-list/reviews-list';
import CommentForm from '../../component/comment-form/comment-form';
import Map from '../../component/map/map';
import OffersList from '../../component/offers-list/offers-list';
import LoadingScreen from '../loading-screen/loading-screen';

type IsLoading = {
  offer: boolean;
  reviews: boolean;
  nearPlaces: boolean;
};

function OfferScreen(): JSX.Element {
  const params = useParams();

  const isLoading: IsLoading = {
    offer: useAppSelector(getStandaloneOfferLoadingStatus),
    reviews: useAppSelector(getReviewsLoadingStatus),
    nearPlaces: useAppSelector(getNearPlacesLoadingStatus)
  };

  const requestedOffer = useAppSelector(getStandaloneOffer);
  const reviews = useAppSelector(getReviews);
  const nearPlaces = useAppSelector(getNearPlaces);
  const isOfferNotFound = useAppSelector(getOfferErrorStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(requestStandaloneOfferAction(params.id));
      dispatch(requestReviewsForOfferAction(params.id));
      dispatch(requestNearPlacesAction(params.id));
    }
  }, [dispatch, params.id]);

  if (isOfferNotFound) {
    return <NotFoundScreen />;
  }

  if (isLoading.offer || isLoading.reviews || isLoading.nearPlaces || requestedOffer === null) {
    return <LoadingScreen />;
  }

  const imagesToRender = requestedOffer.images.slice(0, MAX_IMAGES_TO_RENDER_IN_OFFER);

  const reviewsToRender = prepareReviewsForRendering(reviews);

  const nearPlacesToRender = nearPlaces.slice(0, MAX_NEAR_PLACES_TO_RENDER);

  const offerLocationsForMap: OfferLocationInfo[] = [
    ...nearPlacesToRender.map((offer: Offer) => extractInfoForMap(offer)),
    extractInfoForMap(requestedOffer)
  ];

  return (
    <div className='page'>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header shouldRenderUserInfo />
      <main className='page__main  page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container  container'>
            <div className='offer__gallery'>
              {imagesToRender.map((image) => (
                <div key={image} className='offer__image-wrapper'>
                  <img className='offer__image' src={image} alt='Photo studio' />
                </div>
              ))}
            </div>
          </div>
          <div className='offer__container  container'>
            <div className='offer__wrapper'>
              {requestedOffer.isPremium && <div className='offer__mark'><span>Premium</span></div>}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>{requestedOffer.title}</h1>
                <BookmarkButton className={BookMarkButtonClass.Offer} isFavorite={requestedOffer.isFavorite} id={requestedOffer.id} />
              </div>
              <div className='offer__rating  rating'>
                <div className='offer__stars  rating__stars'>
                  <span style={{width: `${Math.round(requestedOffer.rating) * 20}%`}} />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='offer__rating-value  rating__value'>{requestedOffer.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature  offer__feature--entire'>
                  {capitalize(requestedOffer.type)}
                </li>
                <li className='offer__feature  offer__feature--bedrooms'>
                  {requestedOffer.bedrooms} Bedrooms
                </li>
                <li className='offer__feature  offer__feature--adults'>
                  Max {requestedOffer.maxAdults} adults
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>&euro;{requestedOffer.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>What&apos;s inside</h2>
                <ul className='offer__inside-list'>
                  {requestedOffer.goods.map((good) => <li key={good} className='offer__inside-item'>{good}</li>)}
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user  user'>
                  <div
                    className={cn(
                      'offer__avatar-wrapper  user__avatar-wrapper',
                      {'offer__avatar-wrapper--pro': requestedOffer.host.isPro}
                    )}
                  >
                    <img className='offer__avatar user__avatar' src={requestedOffer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
                  </div>
                  <span className='offer__user-name'>{requestedOffer.host.name}</span>
                  {requestedOffer.host.isPro && <span className='offer__user-status'>Pro</span>}
                </div>
                <div className='offer__description'>
                  <p className='offer__text'>{requestedOffer.description}</p>
                </div>
              </div>
              <section className='offer__reviews  reviews'>
                {(isAuthorized || Boolean(reviews.length)) && (
                  <h2 className='reviews__title'>
                    Reviews
                    {Boolean(reviewsToRender.length) && (
                      <>
                        &nbsp;&middot;&nbsp;
                        <span className='reviews__amount'>{reviews.length}</span>
                      </>
                    )}
                  </h2>
                )}
                <ReviewsList reviews={reviewsToRender} />
                {isAuthorized && <CommentForm />}
              </section>
            </div>
          </div>
          <Map className={MapClass.Offer} offers={offerLocationsForMap} enteredOffer={requestedOffer.id}/>
        </section>
        <div className='container'>
          <section className='near-places  places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OffersList className={CardClass.NearPlaces} offers={nearPlacesToRender} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
