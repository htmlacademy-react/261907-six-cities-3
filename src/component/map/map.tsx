
import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER, URL_MARKER_ACTIVE} from '../../const';
import {Location, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: Location;
  offers: Offer[];
  enteredOffer: string;
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

function Map({city, offers, enteredOffer}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

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
    }
  }, [map, offers, enteredOffer]);

  return (
    <section
      className='cities__map  map'
      ref={mapRef}
    />
  );
}

export default Map;
