import {useEffect, useState} from 'react';
import cn from 'classnames';
import {Sorting} from '../../const';

type SortProps = {
  sorting: Sorting;
  onSortingChange: (requestedSorting: Sorting) => void;
};

function Sort({sorting, onSortingChange}: SortProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const onEscapeKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setIsOpened(!isOpened);
      }
    };

    if (isOpened) {
      document.addEventListener('keydown', onEscapeKeydown);
    }

    return () => {
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [isOpened]);

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by </span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        Popular
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <ul
        className={cn(
          'places__options  places__options--custom',
          {'places__options--opened': isOpened}
        )}
      >
        {Object.values(Sorting).map((sortingType) => (
          <li
            key={sortingType}
            className={cn(
              'places__option',
              {'places__option--active': sortingType === sorting}
            )}
            tabIndex={0}
            onClick={() => {
              if (sortingType === sorting) {
                return;
              }

              onSortingChange(sortingType);
              setIsOpened(!isOpened);
            }}
          >
            {sortingType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
