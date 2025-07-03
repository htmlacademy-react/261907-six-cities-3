import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeCityAction } from '../../store/action';

type LocationTabProps = {
  city: string;
};

function LocationTab({city}: LocationTabProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <li
      className='locations__item'
      onClick={() => {
        dispatch(changeCityAction({city: city}));
      }}
    >
      <a
        className={cn(
          'locations__item-link  tabs__item',
          {'tabs__item--active': city === activeCity}
        )}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationTab;
