import {render, screen} from '@testing-library/react';
import {datatype} from 'faker';
import {CardClass} from '../../const';
import {makeMockOffer, makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import OffersList from './offers-list';

describe('Component: OffersList', () => {
  const mockClassName = CardClass.Cities;
  const mockOffers = Array.from({length: datatype.number({min: 1, max: 10})}, makeMockOffer);
  const offersListTestId = 'offers-list';
  const offerTestId = 'offer-card';

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <OffersList
        className={mockClassName}
        offers={mockOffers}
      />,
      makeMockStore()
    );

    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByTestId(offersListTestId)).toHaveClass(`${mockClassName}__places-list  tabs__content`);
    expect(screen.getAllByTestId(offerTestId).length).toBe(mockOffers.length);
  });
});
