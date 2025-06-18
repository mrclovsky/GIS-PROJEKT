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
      className="absolute bottom-7 right-12 z-[9] bg-white rounded shadow px-2 py-2 flex flex-col gap-1 items-center text-center"
      style={{ minWidth: '160px' }}
    >
      <select
        className="text-black text-sm bg-white border rounded px-1 py-0.5 w-full text-center"
        value={ratingFilter ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          setRatingFilter(value === '' ? null : parseInt(value));
        }}
      >
        <option value="">Ocena: wszystkie</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5</option>
      </select>

      <input
        type="text"
        placeholder="Nazwa..."
        className="text-black text-sm bg-white border rounded px-1 py-0.5 w-full text-center"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <input
        type="number"
        placeholder="Promień (km)"
        className="text-black text-sm bg-white border rounded px-1 py-0.5 w-full text-center"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
      />

      <div className="flex gap-1 w-full justify-center">
        <input
          type="text"
          placeholder="Lat"
          className="text-black text-xs border rounded px-1 py-0.5 w-[60px] text-center"
          value={centerLat}
          onChange={(e) => setCenterLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lng"
          className="text-black text-xs border rounded px-1 py-0.5 w-[60px] text-center"
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
  );
};

export default FilterPanel;
