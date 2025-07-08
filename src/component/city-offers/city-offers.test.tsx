import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import {CITIES} from '../../const';
import {makeMockOffer} from '../../utils/mocks';
import CityOffers from './city-offers';

describe('Component: CityOffers', () => {
  it('should render correctly', () => {
    const mockCity = CITIES[datatype.number(5)];
    const mockOffer = makeMockOffer();
    const mockChildTestId = 'child';
    const mockchild = <span data-testid={mockChildTestId} />;
    const expectedText = `${[mockOffer].length} place${[mockOffer].length > 1 ? 's' : ''} to stay in ${mockCity}`;

    render(<CityOffers city={mockCity} offers={[mockOffer]}>{mockchild}</CityOffers>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(mockChildTestId)).toBeInTheDocument();
  });
});
