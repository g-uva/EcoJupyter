// Using Maplibre
import * as React from 'react';
import Map from 'react-map-gl/maplibre';

export default function MapComponent() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{ width: '100%', height: 400 }}
      mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=EbBHdB4yorH5ew69HEPJ"
    />
  );
}
