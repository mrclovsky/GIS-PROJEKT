// pages/index.tsx
import dynamic from 'next/dynamic';
import React from 'react';

// Importujesz nazwany komponent z 'homepage.tsx'
const HomePage = dynamic(() => import('./homepage').then(mod => mod.HomePage), {
  ssr: false, 
});

export default function IndexPage() {
  return <HomePage />;
}