'use client';
import { useState } from 'react';
import { latLng } from 'leaflet';
import { KebabLocation } from '@/types/KebabType';
import kebabLocationsJson from '@/data/kebabLocations.json';

export function useKebabFilters() {
  // Środek wyszukiwania
  const [searchCenter, setSearchCenter] = useState<[number, number]>([54.3543, 18.6025]);
  // Koordynaty
  const [centerLat, setCenterLat] = useState('54.3543');
  const [centerLng, setCenterLng] = useState('18.6025');
  // Filtry
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<KebabLocation | null>(null);

  // Rzutowanie z JSON (location: number[]) na [number, number]
  const typedKebabLocations: KebabLocation[] = (
    kebabLocationsJson as Array<{
      name: string;
      location: number[];
      hours: string;
      rating: number;
      address: string;
    }>
  ).map(loc => ({
    ...loc,
    location: loc.location as [number, number],
  }));

  // Logika filtrowania
  const filteredKebabLocations = typedKebabLocations
    .filter(kebab => ratingFilter === null || kebab.rating >= ratingFilter)
    .filter(kebab => !searchQuery || kebab.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(kebab => {
      if (radius > 0) {
        const distance = latLng(searchCenter).distanceTo(latLng(kebab.location));
        return distance <= radius * 1000;
      }
      return true;
    });

  return {
    ratingFilter, setRatingFilter,
    searchQuery, setSearchQuery,
    radius, setRadius,
    centerLat, setCenterLat,
    centerLng, setCenterLng,
    searchCenter, setSearchCenter,
    selectedPlace, setSelectedPlace,
    filteredKebabLocations,
  };
}
