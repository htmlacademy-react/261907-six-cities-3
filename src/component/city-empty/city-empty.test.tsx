import {render, screen} from '@testing-library/react';
import {makeMockStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import CityEmpty from './city-empty';

describe('Component: CityEmpty', () => {
  it('should render correctly', () => {
    const mockStore = makeMockStore();
    const expectedText = 'No places to stay available';
    const expectedTextWithCity = `We could not find any property available at the moment in ${mockStore.APP.city}`;
    const {withStoreComponent} = withStore(<CityEmpty withError={false} />, mockStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedTextWithCity)).toBeInTheDocument();
  });

  it('should show error text if error occured', () => {
    const mockStore = makeMockStore();
    const expectedText = /An error occured/i;
    const {withStoreComponent} = withStore(<CityEmpty withError />, mockStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
