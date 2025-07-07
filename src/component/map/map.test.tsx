import {render, screen} from '@testing-library/react';
import {MapClass} from '../../const';
import {makeMockOffer} from '../../utils/mocks';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly and show map', () => {
    const mockClassName = MapClass.Cities;
    const mockOffer = makeMockOffer();
    const mapTestId = 'map';

    render(<Map className={mockClassName} offers={[mockOffer]} enteredOffer='' />);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
    expect(screen.getByText('Leaflet')).toBeInTheDocument();
  });
});
