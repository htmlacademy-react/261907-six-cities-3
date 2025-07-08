import {Review} from '../../types/review';
import {applyRatingStyle} from '../../utils/offers';

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({review}: ReviewCardProps): JSX.Element {
  return (
    <li className='reviews__item' data-testid='review-card'>
      <div className='reviews__user  user'>
        <div className='reviews__avatar-wrapper  user__avatar-wrapper'>
          <img className='reviews__avatar  user__avatar' src={review.user.avatarUrl} width='54' height='54' alt='Reviews avatar' />
        </div>
        <span className='reviews__user-name'>{review.user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating  rating'>
          <div className='reviews__stars  rating__stars'>
            <span style={applyRatingStyle(review.rating)} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{review.comment}</p>
        <time className='reviews__time' dateTime={review.date}>
          {new Date(review.date).toLocaleString(
            'en-US',
            {
              month: 'long',
              year: 'numeric'
            }
          )}
        </time>
      </div>
    </li>
  );
}

export default ReviewCard;
