'use client';

import React from 'react';

type Props = {
  ratingFilter: number | null;
  setRatingFilter: (value: number | null) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  radius: number;
  setRadius: (value: number) => void;
  centerLat: string;
  setCenterLat: (value: string) => void;
  centerLng: string;
  setCenterLng: (value: string) => void;
  setSearchCenter: (value: [number, number]) => void;
};

const FilterPanel: React.FC<Props> = ({
  ratingFilter,
  setRatingFilter,
  searchQuery,
  setSearchQuery,
  radius,
  setRadius,
  centerLat,
  setCenterLat,
  centerLng,
  setCenterLng,
  setSearchCenter,
}) => {
  return (
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

      {/* Filtr po promieniu */}
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

      {/* Środek wyszukiwania */}
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
  );
};

export default FilterPanel;
