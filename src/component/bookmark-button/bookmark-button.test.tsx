import {Route, Routes} from 'react-router';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {datatype} from 'faker';
import {createMemoryHistory} from 'history';
import {AppRoute, BookMarkButtonClass} from '../../const';
import {makeMockStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import BookmarkButton from './bookmark-button';

describe('Component: BookmarkButton', () => {
  const mockId = datatype.uuid();
  const bookmarkButtonTestId = 'bookmark-button';
  const bookmarkIconTestId = 'bookmark-icon';
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly for favorite offer on offer page', () => {
    const mockClassName = BookMarkButtonClass.Offer;
    const {withStoreComponent} = withStore(<BookmarkButton className={mockClassName} isFavorite id={mockId} />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    const icon = screen.getByTestId(bookmarkIconTestId);

    expect(screen.getByTestId(bookmarkButtonTestId)).toHaveClass(`${mockClassName}__bookmark-button--active`);
    expect(icon.getAttribute('width')).toBe('31');
  });

  it('should render correctly for not favorite offer in offer list', () => {
    const mockClassName = BookMarkButtonClass.PlaceCard;
    const {withStoreComponent} = withStore(<BookmarkButton className={mockClassName} isFavorite={false} id={mockId} />, makeMockStore());
    const componentToRender = withHistory(withStoreComponent);

    render(componentToRender);

    const icon = screen.getByTestId(bookmarkIconTestId);

    expect(screen.getByTestId(bookmarkButtonTestId)).not.toHaveClass(`${mockClassName}__bookmark-button--active`);
    expect(icon.getAttribute('width')).toBe('18');
  });

  it('should redirect unauthorized user to login page', async () => {
    const mockClassName = BookMarkButtonClass.PlaceCard;
    const mockCityComponent = <span>Login page</span>;

    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<BookmarkButton className={mockClassName} isFavorite={false} id={mockId} />} />
        <Route path={AppRoute.Login} element={mockCityComponent} />
      </Routes>,
      mockHistory
    );

    const {withStoreComponent} = withStore(componentWithHistory, makeMockStore());

    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId(bookmarkButtonTestId)
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
