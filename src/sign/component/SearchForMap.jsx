import "leaflet-geosearch";
import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L, { icon } from "leaflet";
import { LineMdSearchTwotone } from "../../page/icon/SearchIcon";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export function LeafletControlSearch() {
  const map = useMap();
  /*  function searchEventHandler(result) {
    setVille({ ...result.location });
    console.log(result.location);
  } */

  useEffect(() => {
    /* const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      searchLabel: "J'habite dans la ville de:",
      icon: <LineMdSearchTwotone />,
    });
    map.on("geosearch/showlocation", searchEventHandler);
    map.addControl(searchControl); */

    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Rechercher un lieu...",
      defaultMarkGeocode: true,
      geocoder /* : L.Control.Geocoder.nominatim() */,
      collapsed: true,
      showResultIcons: true,
      position: "topright",
    })
      /* .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      }) */
      .addTo(map);
  }, []);

  return null;
}
