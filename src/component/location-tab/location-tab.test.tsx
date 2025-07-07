import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import {CITIES} from '../../const';
import {makeMockStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import LocationTab from './location-tab';

describe('Component: LocationTab', () => {
  it('should render correctly', () => {
    const mockCity = CITIES[datatype.number(5)];
    const mockStore = makeMockStore();
    const {withStoreComponent} = withStore(<LocationTab city={mockCity} />, mockStore);

    render(withStoreComponent);

    expect(screen.getByText(mockCity)).toBeInTheDocument();
  });

  it('should highlight active city', () => {
    const mockStore = makeMockStore();
    const {withStoreComponent} = withStore(<LocationTab city={mockStore.APP.city} />, mockStore);

    render(withStoreComponent);

    expect(screen.getByTestId('location-link')).toHaveClass('tabs__item--active');
  });
});
