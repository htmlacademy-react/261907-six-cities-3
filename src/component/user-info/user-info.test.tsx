import {render, screen} from '@testing-library/react';
import {AuthorizationStatus} from '../../const';
import {makeMockStore, makeMockUser} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import UserInfo from './user-info';

describe('Component: UserInfo', () => {
  it('should render correctly for unauthorized user', () => {
    const {withStoreComponent} = withStore(<UserInfo />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly for authorized user', () => {
    const mockStore = makeMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        isUserProcessing: false,
        user: makeMockUser()
      }
    });

    const expectedEmail = mockStore.USER.user?.email as string;
    const {withStoreComponent} = withStore(<UserInfo />, mockStore);
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByText(expectedEmail)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
