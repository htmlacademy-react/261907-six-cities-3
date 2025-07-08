import {datatype} from 'faker';
import {render, screen} from '@testing-library/react';
import {MAX_REVIEWS_TO_RENDER} from '../../const';
import {makeMockReview} from '../../utils/mocks';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = Array.from({length: datatype.number(MAX_REVIEWS_TO_RENDER)}, makeMockReview);
    const reviewsListTestId = 'reviews-list';
    const reviewCardTestId = 'review-card';

    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByTestId(reviewsListTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(reviewCardTestId).length).toBe(mockReviews.length);
  });
});
