import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../const';
import {makeMockStore, makeMockUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render login component for unauthorized user', () => {
    const expectedText = 'login page';
    const notExpectedText = 'favorites page';

    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render favorites component for authorized user', () => {
    const expectedText = 'favorites page';
    const notExpectedText = 'login page';

    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    const {withStoreComponent} = withStore(withHistoryComponent, makeMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        isUserProcessing: false,
        user: makeMockUser()
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
