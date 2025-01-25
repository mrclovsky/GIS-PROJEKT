import Image from 'next/image'
import Socials from '@/components/Socials'
import Navbar from '@/components/Navbar'
import Transition from '@/components/Transition';
import Countup from '@/components/Countup';
import Description from '@/components/Description';
import Footer from '@/components/Footer';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { latLng } from 'leaflet';
import React from 'react';
import kebabLocationsJson from '@/data/kebabLocations.json';

// Dynamicznie importowane komponenty React-Leaflet (SSR wyłączony)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

type KebabLocation = {
  name: string;
  location: [number, number];
  hours: string;
  rating: number;
  address: string;
};

// Rzutowanie z JSON (location: number[]) na [number, number]
const typedKebabLocations: KebabLocation[] = (
  kebabLocationsJson as Array<{
    name: string;
    location: number[]; 
    hours: string;
    rating: number;
    address: string;
  }>
).map((loc) => ({
  ...loc,
  location: loc.location as [number, number],
}));


// Markery
const getCenterIcon = () => {
  if (typeof window === 'undefined') return null;
  const L = require('leaflet');

  return new L.DivIcon({
    className: '',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: #FFFFFF;
        border: 2px solid #000;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      "></div>
    `,
  });
};

const getTriangleIcon = (rating: number, highlight: boolean = false) => {
  if (typeof window === 'undefined') return null;

  const L = require('leaflet');
  let color = '';

  if (rating >= 4) {
    color = '#FF5733'; // Czerwony
  } else if (rating >= 3) {
    color = '#FFC300'; // Pomarańczowy
  } else if (rating >= 2) {
    color = '#3498DB'; // Niebieski
  } else {
    color = '#2ECC71'; // Zielony
  }

  const boxShadow = highlight
    ? 'box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);'
    : '';

  return new L.DivIcon({
    className: '',
    html: `
      <div style="
        position: relative;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 30px solid ${color};
        transform: translate(-50%, -50%);
        ${boxShadow}
      ">
        <div style="
          position: absolute;
          top: -8px;
          left: -12px;
          width: 24px;
          height: 8px;
          background: ${color};
          border-radius: 50% 50% 0 0;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        "></div>
      </div>
    `,
  });
};

export function HomePage() {
  // Wyłaczony SSR
  if (typeof window === 'undefined') {
    return null; 
  }

   
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

  // Logika filtrowania
  const filteredKebabLocations = typedKebabLocations
    .filter((kebab) => {
      if (ratingFilter === null) return true;
      return kebab.rating >= ratingFilter;
    })
    .filter((kebab) => {
      if (!searchQuery) return true;
      return kebab.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((kebab) => {
      if (radius > 0) {
        const distance = latLng(searchCenter).distanceTo(latLng(kebab.location));
        if (distance > radius * 1000) {
          return false;
        }
      }
      return true;
    });

  return (
    <>
      <Transition/>
      <div className="absolute z-20 w-full flex">
        <div className='container ml-auto mt-2 mr-4 lg:mr-6 xl:mr-12'>
          <div className='flex flex-row items-center justify-end'>
            <Socials/>
          </div>
        </div>
      </div>
      <Navbar/>
      
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0">
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

            {/* Marker pokazujący aktualny środek wyszukiwania */}
            <Marker
              position={searchCenter}
              icon={getCenterIcon()}
            >
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
                  <div>
                    <h3 className="font-bold text-lg text-center">{kebab.name}</h3>
                    <p className="text-center">
                      <strong>Adres:</strong> {kebab.address}
                    </p>
                    <p className="text-center">
                      <strong>Godziny otwarcia:</strong> {kebab.hours}
                    </p>
                    <p className="text-center">
                      <strong>Ocena:</strong> {kebab.rating}/5
                    </p>

                    <div className="text-center">
                      <button
                        onClick={(e) => {
                          const form = e.currentTarget.nextElementSibling;
                          if (form) {
                            form.classList.toggle('hidden');
                          }
                        }}
                        className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Dodaj swoją ocenę
                      </button>
                      <div className="hidden mt-2">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const popupElement = e.currentTarget.closest('.leaflet-popup');
                            if (popupElement) {
                              const closeButton = popupElement.querySelector('.leaflet-popup-close-button') as HTMLButtonElement;
                              if (closeButton) {
                                closeButton.click();
                              }
                            }
                          }}
                        >
                          <div className="mb-2">
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                              Ocena (1-5):
                            </label>
                            <input
                              type="number"
                              id="rating"
                              name="rating"
                              min="1"
                              max="5"
                              required
                              className="w-full px-2 py-1 border rounded"
                            />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                              Komentarz:
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={2}
                              required
                              className="w-full px-2 py-1 border rounded"
                            ></textarea>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              Wyślij
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
        
        <div className="absolute top-[70%] ml-12 lg:ml-16 pointer-events-none">
          <p className="text-4xl lg:text-5xl xl:text-6xl h-full font-bold drop-shadow-xl">
            MAPA<span className="text-yellow-400">.</span>
          </p>
          <p className="text-xl lg:text-2xl drop-shadow-xl">Kebabów</p>
        </div>

        {/* Panel filtrów w prawym dolnym rogu */}
        <div 
          className="absolute bottom-7 right-12 z-[10] bg-white rounded shadow px-3 py-2 flex flex-col gap-y-2"
          style={{ minWidth: '160px' }}
        >
          {/* Filtr oceny */}
          <div className="flex items-center justify-between">
            <label htmlFor="ratingFilter" className="text-sm text-black mr-2">
              Ocena:
            </label>
            <select
              id="ratingFilter"
              className="text-black text-sm bg-white border rounded px-1 py-0.5"
              value={ratingFilter ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setRatingFilter(value === '' ? null : parseInt(value));
              }}
            >
              <option value="">Wszystkie</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Filtr po nazwie */}
          <div className="flex flex-col">
            <label htmlFor="searchQuery" className="text-sm text-black">
              Nazwa:
            </label>
            <input
              id="searchQuery"
              type="text"
              placeholder="Szukaj..."
              className="text-black text-sm bg-white border rounded px-1 py-0.5 mt-0.5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtr po promieniu (km) */}
          <div className="flex flex-col">
            <label htmlFor="radius" className="text-sm text-black">
              Promień (km):
            </label>
            <input
              id="radius"
              type="number"
              className="text-black text-sm bg-white border rounded px-1 py-0.5 mt-0.5"
              placeholder="np. 2"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
          </div>

          {/* Ustawienie środka wyszukiwania */}
          <div className="text-sm text-black mt-2">
            <p className="font-semibold">Środek wyszukiwania:</p>
            <div className="flex items-center gap-x-1 mt-1">
              <label className="text-xs">Lat:</label>
              <input
                type="text"
                className="w-[60px] border rounded px-1 py-0.5"
                value={centerLat}
                onChange={(e) => setCenterLat(e.target.value)}
              />
              <label className="text-xs">Lng:</label>
              <input
                type="text"
                className="w-[60px] border rounded px-1 py-0.5"
                value={centerLng}
                onChange={(e) => setCenterLng(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                const latNum = parseFloat(centerLat);
                const lngNum = parseFloat(centerLng);
                setSearchCenter([latNum, lngNum]);
              }}
              className="mt-1 w-full bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
            >
              Ustaw punkt
            </button>
          </div>
        </div>
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
