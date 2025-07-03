import {CITIES} from '../../const';
import LocationTab from '../location-tab/location-tab';

function LocationsList(): JSX.Element {
  return(
    <ul className='locations__list  tabs__list'>
      {CITIES.map((city) => (
        <LocationTab
          key={city}
          city={city}
        />
      ))}
    </ul>
  );
}

export default LocationsList;
