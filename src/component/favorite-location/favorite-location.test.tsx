import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import {CITIES} from '../../const';
import {makeMockOffer, makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import FavoriteLocation from './favorite-location';

describe('Component: FavotiteLocation', () => {
  it('should render correctly', () => {
    const mockLocation = {
      name: CITIES[datatype.number(5)],
      offers: Array.from({length: datatype.number({min: 1, max: 10})}, makeMockOffer)
    };

    const favoriteLocationsContainerTestId = 'favorites-places';
    const favoriteOfferTestId = 'offer-card';

    const {withStoreComponent} = withStore(<FavoriteLocation location={mockLocation} />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByTestId(favoriteLocationsContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(favoriteOfferTestId).length).toBe(mockLocation.offers.length);
  });
});
