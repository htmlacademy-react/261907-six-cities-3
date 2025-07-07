import {render, screen} from '@testing-library/react';
import ReviewCard from './review-card';
import {makeMockReview} from '../../utils/mocks';

describe('Component: Review Card', () => {
  it('should render correctly', () => {
    const mockReview = makeMockReview();

    render(<ReviewCard review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
