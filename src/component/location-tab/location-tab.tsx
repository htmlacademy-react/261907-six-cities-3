import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCity} from '../../store/app-process/app-process.selectors';
import {changeCityAction} from '../../store/app-process/app-process.slice';

type LocationTabProps = {
  city: string;
};

function LocationTab({city}: LocationTabProps): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <li
      className='locations__item'
      onClick={() => {
        dispatch(changeCityAction(city));
      }}
      data-testid='location-tab'
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
