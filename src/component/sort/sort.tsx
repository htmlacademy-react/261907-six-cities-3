import {useEffect, useState} from 'react';
import cn from 'classnames';
import {Sorting} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSortingAction} from '../../store/action';

function Sort(): JSX.Element {
  const currentSorting = useAppSelector((state) => state.sorting);
  const dispatch = useAppDispatch();
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
              {'places__option--active': sortingType === currentSorting}
            )}
            tabIndex={0}
            onClick={() => {
              if (sortingType === currentSorting) {
                return;
              }

              dispatch(changeSortingAction({sorting: sortingType}));
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
