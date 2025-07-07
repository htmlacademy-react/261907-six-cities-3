import {datatype} from 'faker';
import {render, screen} from '@testing-library/react';
import {makeMockReview} from '../../utils/mocks';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = Array.from({length: datatype.number(20)}, makeMockReview);
    const reviewsListTestId = 'reviews-list';
    const reviewCardTestId = 'review-card';

    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByTestId(reviewsListTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(reviewCardTestId).length).toBe(mockReviews.length);
  });
});
