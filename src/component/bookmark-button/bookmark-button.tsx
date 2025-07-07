import {PointerEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';
import {AppRoute, AuthorizationStatus, BookMarkButtonClass} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteStatusAction} from '../../store/api-action';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {getFavoriteProcessingStatus} from '../../store/app-data/app-data.selectors';

type BookmarkButtonProps = {
  className: BookMarkButtonClass;
  isFavorite: boolean;
  id: string;
}

function BookmarkButton({className, isFavorite, id}: BookmarkButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFavoriteProcessing = useAppSelector(getFavoriteProcessingStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (evt: PointerEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }

    dispatch(changeFavoriteStatusAction({
      id: id,
      status: Number(!isFavorite)
    }));
  };

  return (
    <button
      className={cn(
        `${className}__bookmark-button  button`,
        {[`${className}__bookmark-button--active`]: isFavorite}
      )}
      type='button'
      onClick={handleFavoriteClick}
      disabled={isFavoriteProcessing}
    >
      <svg className={`${className}__bookmark-icon`} width={className === BookMarkButtonClass.Offer ? '31' : '18'} height={className === BookMarkButtonClass.Offer ? '33' : '19'}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
