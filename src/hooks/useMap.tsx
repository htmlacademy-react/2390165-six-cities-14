import { useState, useRef, useEffect } from 'react';

import { Map } from 'leaflet';
import L from 'leaflet';

import { CityMap } from '../mocks/city';

function useMap(
  mapRef: React.MutableRefObject<HTMLElement | null>,
  cities: Array<CityMap>
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const city = cities.find((it) => it?.title === 'Amsterdam');

  useEffect(() => {
    if (!isRenderedRef.current && mapRef.current !== null && city) {
      const instance = L.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom
      });

      const layer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      layer.addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);
  return map;
}

export default useMap;

