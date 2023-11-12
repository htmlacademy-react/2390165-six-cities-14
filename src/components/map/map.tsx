import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { useRef, useEffect } from 'react';

import useMap from '../../hooks/useMap';
import { CityMap } from '../../mocks/city';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

import { Offer } from '../../types/offer';
import { ActiveCity } from '../../types/city';

type MapProps = {
  mapType: 'cities' | 'offer';
  cityLocations: Array<CityMap>;
  offers: Array<Offer>;
  hoveredOfferId: Offer['id'] | null;
  activeCity: ActiveCity;
}

const defaultCustomIcon = L.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = L.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function Map({ mapType, cityLocations, offers, hoveredOfferId, activeCity }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocations, activeCity);
  const offersByCityList = offers.filter((offer) => offer.city.name === activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = L.layerGroup().addTo(map);
      offersByCityList.forEach((offer) => {
        const marker = L.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            hoveredOfferId !== undefined && offer.id === hoveredOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .bindPopup(`<h2>${offer.title}</h2><p style="font-size:1.5em">€${offer.price}</p>`);

      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offersByCityList, hoveredOfferId, activeCity]);

  useEffect(() => {
    if (map) {
      const location = cityLocations.find((city) => city?.title === activeCity);
      if (location) {
        map.setView({
          lat: location.lat,
          lng: location.lng,
        });
      }
    }
  });


  return (
    <section
      className={`${mapType}__map map`}
      ref={mapRef}
      style={mapType === 'offer' ?
        {
          height: '100%',
          minHeight: '500px',
          width: '100%',
          minWidth: '1144px',
          margin: '0, auto'
        }
        : undefined}
    >
    </section>
  );
}

export default Map;
