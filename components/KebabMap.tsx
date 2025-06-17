'use client';

import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import { getCenterIcon, getTriangleIcon } from '@/utils/Icons';
import KebabPopup from '@/components/KebabPopup';

type KebabLocation = {
  name: string;
  address: string;
  hours: string;
  rating: number;
  location: [number, number];
};

type KebabMapProps = {
  searchCenter: [number, number];
  filteredKebabLocations: KebabLocation[];
  searchQuery: string;
  ratingFilter: number | null;
  radius: number;
  setSelectedPlace: (place: KebabLocation) => void;
};

const KebabMap: React.FC<KebabMapProps> = ({
  searchCenter,
  filteredKebabLocations,
  searchQuery,
  ratingFilter,
  radius,
  setSelectedPlace,
}) => {
  return (
    <MapContainer
      center={searchCenter}
      zoom={13}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
      />

      <Marker position={searchCenter} icon={getCenterIcon()}>
        <Popup>
          <div className="text-center">
            <p className="font-semibold">Środek wyszukiwania</p>
          </div>
        </Popup>
      </Marker>

      {filteredKebabLocations.map((kebab, index) => (
        <Marker
          key={index}
          position={kebab.location}
          icon={getTriangleIcon(
            kebab.rating,
            ratingFilter !== null ||
              searchQuery.trim() !== '' ||
              radius > 0
          )}
          eventHandlers={{
            click: () => {
              setSelectedPlace(kebab);
            },
          }}
        >
          <Popup>
            <KebabPopup kebab={kebab} />
          </Popup>
        </Marker>
      ))}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default KebabMap;
