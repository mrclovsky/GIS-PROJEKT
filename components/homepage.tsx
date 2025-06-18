import Socials from '@/components/layout/Socials'
import Navbar from '@/components/layout/Navbar'
import Transition from '@/components/layout/Transition';
import Countup from '@/components/layout/Countup';
import Description from '@/components/layout/Description';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import React from 'react';
import KebabMap from '@/components/KebabMap';
import FilterPanel from '@/components/FilterPanel';
import { useKebabFilters } from '@/hooks/useKebabFilters';
import RouteLayer from '@/components/RouteLayer';

// Dynamicznie importowane komponenty React-Leaflet (SSR wyłączony)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export function HomePage() {
  // Wyłaczony SSR
  if (typeof window === 'undefined') {
    return null; 
  }

  const {
    ratingFilter, setRatingFilter,
    searchQuery, setSearchQuery,
    radius, setRadius,
    centerLat, setCenterLat,
    centerLng, setCenterLng,
    searchCenter, setSearchCenter,
    selectedPlace, setSelectedPlace,
    filteredKebabLocations
  } = useKebabFilters();
    
  return (
    <>
      <Transition/>
      {/* Nawigacja */}
      <div className="absolute z-20 w-full flex">
        <div className='container ml-auto mt-2 mr-4 lg:mr-6 xl:mr-12'>
          <div className='flex flex-row items-center justify-end'>
            <Socials/>
          </div>
        </div>
      </div>
      <Navbar/>
      
      {/* Główna Mapa */}
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0">
        <KebabMap
        searchCenter={searchCenter}
          filteredKebabLocations={filteredKebabLocations}
  searchQuery={searchQuery}
  ratingFilter={ratingFilter}
  radius={radius}
  setSelectedPlace={setSelectedPlace}
  selectedPlace={selectedPlace}
/>
        </div>
        
        <div className="absolute top-[85%] ml-12 lg:ml-16 pointer-events-none">
          <p className="text-4xl lg:text-5xl xl:text-6xl h-full font-bold drop-shadow-xl">
            MAPA<span className="text-yellow-400">.</span>
          </p>
          <p className="text-xl lg:text-2xl drop-shadow-xl">Kebabów</p>
        </div>

        {/* Panel filtrów w prawym dolnym rogu */}
        <FilterPanel
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          radius={radius}
          setRadius={setRadius}
          centerLat={centerLat}
          setCenterLat={setCenterLat}
          centerLng={centerLng}
          setCenterLng={setCenterLng}
          setSearchCenter={setSearchCenter}
          />
      </div>

      {/* opis wydarzenia */}
      <Description/>
      <div className='w-full md:w-4/5 lg:w-3/5 flex flex-col mx-auto items-center justify-center p-2 mt-4 gap-y-3'>
        <div className='mt-8'>
          <Countup/>
        </div>
      </div>

      {/* stopka */}
      <Footer/>
    </>
  );
}


// Wyłączenie SSR dla całej strony
export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
