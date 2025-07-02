import {CITIES} from '../../const';
import LocationTab from '../location-tab/location-tab';

type LocationsListProps = {
  activeCity: string;
  onCityPick: (city: string) => void;
};

function LocationsList({activeCity, onCityPick}: LocationsListProps): JSX.Element {
  return(
    <ul className='locations__list  tabs__list'>
      {CITIES.map((city) => (
        <LocationTab
          key={city}
          city={city}
          isActive={city === activeCity}
          onCityPick={onCityPick}
        />
      ))}
    </ul>
  );
}

export default LocationsList;
