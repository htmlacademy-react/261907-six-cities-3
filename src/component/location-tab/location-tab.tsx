import cn from 'classnames';

type LocationTabProps = {
  city: string;
  isActive: boolean;
  onCityPick: (city: string) => void;
};

function LocationTab({city, isActive, onCityPick}: LocationTabProps): JSX.Element {
  return (
    <li
      className='locations__item'
      onClick={() => {
        onCityPick(city);
      }}
    >
      <a
        className={cn(
          'locations__item-link  tabs__item',
          {'tabs__item--active': isActive}
        )}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationTab;
