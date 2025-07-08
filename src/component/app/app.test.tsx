import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import {datatype} from 'faker';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import {makeMockStore, makeMockUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import App from './app';

describe('App Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainScreen when user navigate to /', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore());
    const cityTestId = 'location-tab';
    const expectedCitiesCount = CITIES.length;

    mockHistory.push(AppRoute.Main);
    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getAllByTestId(cityTestId).length).toBe(expectedCitiesCount);
  });

  it('should render LoginScreen when user navigate to /login', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore());
    const loginFormTestId = 'login-form';

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByTestId(loginFormTestId)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render FavoritesScreen when user navigate to /favorites', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        isUserProcessing: false,
        user: makeMockUser()
      }
    }));

    const favoriesTestId = 'favorites';

    mockHistory.push(AppRoute.Favorites);
    render(withStoreComponent);

    expect(screen.getByText(/Saved/i)).toBeInTheDocument();
    expect(screen.getByTestId(favoriesTestId)).toBeInTheDocument();
  });

  it('should render OfferScreen when user navigate to /offer/:id', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore());

    mockHistory.push(`${AppRoute.Offer}/${datatype.uuid()}`);
    render(withStoreComponent);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore());
    const unknownRoute = '/unknown-route';
    const mainPageSuggestTestId = 'main-page-suggest';

    mockHistory.push(unknownRoute);
    render(withStoreComponent);

    expect(screen.getByText('404: The Page Isn’t Found')).toBeInTheDocument();
    expect(screen.getByTestId(mainPageSuggestTestId)).toBeInTheDocument();
  });
});
