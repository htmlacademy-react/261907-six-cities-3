import {Review} from '../../types/review';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className='reviews__list'>
      {reviews.map((review) => <ReviewCard key={review.id} review={review}/>)}
    </ul>
  );
}

export default ReviewsList;
