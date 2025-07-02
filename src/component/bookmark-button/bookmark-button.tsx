import cn from 'classnames';
import {BookMarkButtonClass} from '../../const';

type BookmarkButtonProps = {
  className: BookMarkButtonClass;
  isFavorite: boolean;
}

function BookmarkButton({className, isFavorite}: BookmarkButtonProps): JSX.Element {
  const activeClass = `${className}__bookmark-button--active`;

  return (
    <button
      className={cn(
        `${className}__bookmark-button  button`,
        {[activeClass]: isFavorite}
      )}
      type='button'
    >
      <svg className={`${className}__bookmark-icon`} width={className === BookMarkButtonClass.Offer ? '31' : '18'} height={className === BookMarkButtonClass.Offer ? '33' : '19'}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{isFavorite ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
