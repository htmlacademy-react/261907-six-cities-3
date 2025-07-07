
import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER, URL_MARKER_ACTIVE, MapClass} from '../../const';
import {City, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map';

type MapProps = {
  className: MapClass;
  offers: Offer[];
  enteredOffer?: string;
};

const customIcon = new Icon({
  iconUrl: URL_MARKER,
  iconSize: [27, 39],
  iconAnchor: [14, 20]
});

const customIconActive = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [14, 20]
});

function Map({className, offers, enteredOffer = ''}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const city : City = offers[0].city;
  const renderedCity = useRef<string>(city.name);
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer: Offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            enteredOffer && enteredOffer === offer.id
              ? customIconActive
              : customIcon
          )
          .addTo(map);
      });

      if (renderedCity.current !== city.name) {
        map.setView(
          [city.location.latitude, city.location.longitude],
          city.location.zoom
        );
      }
    }
  }, [map, offers, enteredOffer, city]);

  return (
    <section
      className={`${className}__map  map`}
      ref={mapRef}
      data-testid='map'
    />
  );
}

export default Map;
