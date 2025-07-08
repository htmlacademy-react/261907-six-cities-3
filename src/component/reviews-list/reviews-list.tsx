import {MAX_REVIEWS_TO_RENDER} from '../../const';
import {Review} from '../../types/review';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const reviewsToRender = reviews.slice(0, MAX_REVIEWS_TO_RENDER);

  return (
    <ul className='reviews__list' data-testid='reviews-list'>
      {reviewsToRender.map((review) => <ReviewCard key={review.id} review={review}/>)}
    </ul>
  );
}

export default ReviewsList;
