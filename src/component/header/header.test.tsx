import {render, screen} from '@testing-library/react';
import {makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import Header from './header';

describe('Component: Header', () => {
  const headerTestId = 'header';
  const expectedAltText = '6 cities logo';
  const userInfoTestId = 'user-info';

  it('should render correctly without user info', () => {
    const shouldRenderUserInfo = false;
    const {withStoreComponent} = withStore(<Header shouldRenderUserInfo={shouldRenderUserInfo} />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.queryByTestId(userInfoTestId)).not.toBeInTheDocument();
  });

  it('should render correctly with user info', () => {
    const shouldRenderUserInfo = true;
    const {withStoreComponent} = withStore(<Header shouldRenderUserInfo={shouldRenderUserInfo} />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByTestId(userInfoTestId)).toBeInTheDocument();
  });
});
