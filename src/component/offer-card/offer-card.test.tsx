import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CardClass} from '../../const';
import {capitalize} from '../../utils/utils';
import {makeMockOffer, makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import OfferCard from './offer-card';

describe('Component: OfferCard', () => {
  const mockClassName = CardClass.Cities;
  const mockOffer = makeMockOffer();
  const mockOnEnter = vi.fn();
  const mockOnLeave = vi.fn();
  const offerTestId = 'offer-card';

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <OfferCard
        className={mockClassName}
        offer={mockOffer}
        onOfferEnter={mockOnEnter}
        onOfferLeave={mockOnLeave}
      />,
      makeMockStore()
    );

    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByTestId(offerTestId)).toHaveClass(`${mockClassName}__card  place-card`);
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(capitalize(mockOffer.type))).toBeInTheDocument();
  });

  it('should call onOfferEnter when user hovers on offer', async () => {
    const {withStoreComponent} = withStore(
      <OfferCard
        className={mockClassName}
        offer={mockOffer}
        onOfferEnter={mockOnEnter}
        onOfferLeave={mockOnLeave}
      />,
      makeMockStore()
    );

    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    await userEvent.hover(
      screen.getByTestId(offerTestId)
    );

    expect(mockOnEnter).toBeCalledTimes(1);
  });

  it('should call onOfferLeave when user moves mouse from offer', async () => {
    const {withStoreComponent} = withStore(
      <OfferCard
        className={mockClassName}
        offer={mockOffer}
        onOfferEnter={mockOnEnter}
        onOfferLeave={mockOnLeave}
      />,
      makeMockStore()
    );

    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    await userEvent.unhover(
      screen.getByTestId(offerTestId)
    );

    expect(mockOnLeave).toBeCalledTimes(1);
  });
});
