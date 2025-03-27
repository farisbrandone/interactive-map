import { useEventHandlers } from "@react-leaflet/core";
import { useCallback, useMemo, useState } from "react";
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { PhGpsFixFill } from "../icon/GeoLocal";
import { ClarityHouseSolid } from "../icon/HouseIcon";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

export function MinimapControl({ position, zoom }) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

export function Geolocalisation({ user }) {
  const parentMap = useMap();

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <a
          size="small"
          role="button"
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              parentMap.setView([
                position.coords.latitude,
                position.coords.longitude,
              ]);
            });
          }}
        >
          <PhGpsFixFill width="2em" height="2em" />
        </a>
      </div>
    </div>
  );
}

export function FocusView() {
  const parentMap = useMap();
  function SetViewOnClick(coords) {
    parentMap.setView(coords, 4 /* parentMap.getZoom() */);

    return null;
  }
  return (
    <div className="leaflet-top leaflet-right aba">
      <div className="leaflet-control leaflet-bar">
        <a
          size="small"
          role="button"
          onClick={() => {
            SetViewOnClick([48.8566, 2.3522]);
          }}
        >
          <ClarityHouseSolid width="2em" height="2em" />
        </a>
      </div>
    </div>
  );
}
