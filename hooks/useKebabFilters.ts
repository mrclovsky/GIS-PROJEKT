'use client';
import { useState, useEffect } from 'react';
import { latLng } from 'leaflet';
import { KebabLocation } from '@/types/KebabType';

export function useKebabFilters() {
  // Środek wyszukiwania
  const [searchCenter, setSearchCenter] = useState<[number, number]>([54.4, 18.6]);
  // Koordynaty
  const [centerLat, setCenterLat] = useState('54.4');
  const [centerLng, setCenterLng] = useState('18.6');
  // Filtry
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState<number>(0);
  const [selectedPlace, setSelectedPlace] = useState<KebabLocation | null>(null);

  // Dane kebabów z API
  const [typedKebabLocations, setTypedKebabLocations] = useState<KebabLocation[]>([]);

  // Pobieranie danych z API
  useEffect(() => {
    const fetchKebabLocations = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/v1/kebab');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const kebabLocationsJson: Array<{
          name: string;
          location: number[];
          hours: string;
          rating: number;
          address: string;
        }> = await response.json();

        const mapped = kebabLocationsJson.map(loc => ({
          ...loc,
          location: loc.location as [number, number],
        }));

        setTypedKebabLocations(mapped);
      } catch (error) {
        console.error('Błąd podczas pobierania lokalizacji kebabów:', error);
      }
    };

    fetchKebabLocations();
  }, []);

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
