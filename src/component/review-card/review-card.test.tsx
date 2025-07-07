import {render, screen} from '@testing-library/react';
import {makeMockReview} from '../../utils/mocks';
import ReviewCard from './review-card';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const mockReview = makeMockReview();

    render(<ReviewCard review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
