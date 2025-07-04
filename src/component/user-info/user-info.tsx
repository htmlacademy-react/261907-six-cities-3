import {PointerEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {findFavorites} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-action';

function UserInfo(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const offers = useAppSelector((state) => state.offers);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const favoritesCount = findFavorites(offers).length;
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: PointerEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item  user'>
          <Link className='header__nav-link  header__nav-link--profile' to={isAuthorized ? AppRoute.Favorites : AppRoute.Login}>
            <div className='header__avatar-wrapper  user__avatar-wrapper' />
            {isAuthorized
              ? (
                <>
                  <span className='header__user-name  user__name'>{user?.email}</span>
                  {Boolean(favoritesCount) && <span className='header__favorite-count'>{favoritesCount}</span>}
                </>
              )
              : <span className='header__login'>Sign in</span>}
          </Link>
        </li>
        {isAuthorized && (
          <li className='header__nav-item'>
            <a className='header__nav-link' href='#' onClick={handleSignOut}>
              <span className='header__signout'>Sign out</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default UserInfo;
