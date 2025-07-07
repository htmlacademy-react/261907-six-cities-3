import {render, screen} from '@testing-library/react';
import {CITIES} from '../../const';
import {makeMockStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import LocationsList from './locations-list';

describe('Component: LocationTab', () => {
  it('should render correctly', () => {
    const locationTabTestId = 'location-tab';
    const {withStoreComponent} = withStore(<LocationsList />, makeMockStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId(locationTabTestId).length).toBe(CITIES.length);
  });
});
