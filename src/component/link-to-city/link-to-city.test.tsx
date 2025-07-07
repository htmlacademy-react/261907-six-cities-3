import {Route, Routes} from 'react-router';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {datatype} from 'faker';
import {AppRoute, CITIES} from '../../const';
import {makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import LinkToCity from './link-to-city';

describe('Component: LinkToCity', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  it('should render correctly', () => {
    const mockCity = CITIES[datatype.number(5)];
    const mockStore = makeMockStore();
    const {withStoreComponent} = withStore(<LinkToCity city={mockCity} />, mockStore);
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByText(mockCity)).toBeInTheDocument();
  });

  it('should redirect to MainScreen on click', async () => {
    const mockCity = CITIES[datatype.number(5)];
    const mockStore = makeMockStore();
    const mockTestId = 'city-to-link';
    const mockCityComponent = <span data-testid={mockTestId}>{mockCity}</span>;

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<LinkToCity city={mockCity} />} />
        <Route path={AppRoute.Main} element={mockCityComponent} />
      </Routes>,
      mockHistory
    );

    const {withStoreComponent} = withStore(componentWithHistory, mockStore);

    render(withStoreComponent);

    await userEvent.click(
      screen.getByRole('link')
    );

    expect(screen.getByTestId(mockTestId)).toBeInTheDocument();
  });
});
