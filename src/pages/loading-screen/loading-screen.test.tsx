import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
  it('should render correctly', () => {
    const loadingElementTestId = 'loader';

    render(<LoadingScreen />);

    expect(screen.getByTestId(loadingElementTestId)).toBeInTheDocument();
  });
});
