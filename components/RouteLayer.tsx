import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

interface RouteLayerProps {
  start: [number, number];
  end: [number, number];
}

const RouteLayer: React.FC<RouteLayerProps> = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const [routeInfo, setRouteInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!routingControlRef.current) {
      const control = L.Routing.control({
        waypoints: [],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        fitSelectedRoutes: false,
        createMarker: () => null,
        lineOptions: {
          styles: [
            {
              color: '#5DADE2',
              weight: 10,
              opacity: 0.9,
              dashArray: '8, 14',
              lineCap: 'square',
            },
          ],
        },
      }) as L.Routing.Control;

      control.addTo(map);
      routingControlRef.current = control;

      control.on('routesfound', function (e: any) {
        const route = e.routes[0];
        const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
        const timeMin = Math.round(route.summary.totalTime / 60);
        setRouteInfo(`Dystans: ${distanceKm} km || Czas: ~${timeMin} min`);
        console.log('Route found:', route.summary);
      });

      console.log('Routing control created and added to map');
    }

    routingControlRef.current.setWaypoints([
      L.latLng(...start),
      L.latLng(...end),
    ]);
    console.log('Waypoints updated');

    return () => {
      routingControlRef.current?.setWaypoints([]);
      setRouteInfo(null);
      console.log('Waypoints cleared on unmount');
    };
  }, [map, start, end]);

  const handleClose = () => {
    routingControlRef.current?.setWaypoints([]);
    setRouteInfo(null);
    console.log('Route and panel hidden by user');
  };

  return (
    <>
      {routeInfo && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#5DADE2',
            color: 'white',
            padding: '4px 4px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span>{routeInfo}</span>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default RouteLayer;
