import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import { divIcon, Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-control-geocoder";

import { OpenStreetMapProvider, SearchControl } from "leaflet-geosearch";
import { FocusView, MinimapControl } from "./sign/component/MiniMap";

import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import Login from "./components/Login";
import AllbuttonHeader from "./components/AllbuttonHeader";
import CardAdmin from "./components/CardAdmin";

import {
  deleteMarquerWithId,
  getMarquersAllInApi,
  getMarquersWithUidInApi,
  updateMarquerWithId,
} from "../api/getCountryData";
import { videoTransformer } from "./sign/verifyMotsDePasse";
import ManageUserCard from "./components/ManageUserCard";
import Load from "./components/Load";

function App() {
  const currentUser = auth.currentUser;
  const [displayMarquer, setDisplayMarquer] = useState([]);
  const [userState, setUserState] = useState();
  const [allMarqueur, setAllMarqueur] = useState(false);
  const [loadingFail, setLoadingFail] = useState(false);
  const [a, setA] = useState(2);

  const [displayAdmin, setDisplayAdmin] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displayConnexionButton, setDisplayConnexionButton] = useState(
    currentUser ? false : true
  );
  const [openCardAdmin, setOpenCardAdmin] = useState(false);
  const [openManageUser, setOpenManageUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const citiesRef = collection(db, "markers");

  const setLeafletMapRef = (map) => {
    if (!!map) {
      map.addControl(searchControl);
    }
  };

  const handleConnexion = () => {
    setDisplayLogin(true);
  };

  const myfunction = useCallback(setLeafletMapRef, [a]);

  const custumIcon = new Icon({
    iconUrl: "/carte/extMarker.png",
    iconSize: [25, 38],
  });
  const creaCustumClusterIcon = (name, isCompany, customIconUrl) => {
    if (isCompany && customIconUrl) {
      return new Icon({
        iconUrl: customIconUrl, // L'URL de l'icône personnalisée pour les entreprises
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });
    }

    let iconColor = name?.split(" ").length > 2 ? "#BD10E0" : "#f8e71c";
    return new divIcon({
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
      html:
        '<div style="background-color: ' +
        iconColor +
        '; border-radius: 50%; height: 30px; width: 30px; text-align: center; line-height: 30px; color: #FFFFFF; fontsize: 22px;">&#x2665;</div>',
    });
    /* return new divIcon({
      html: ` <div class="cluster-icon" > ${cluster.getChildCount()} </div>`,
        className: "custom-marker-cluster",
      iconSize: point(33, 33, true), 
    }); */
  };

  const searchControl = new SearchControl({
    provider: new OpenStreetMapProvider(),
    showMarker: false,
    autoClose: true,
    searchLabel: "Entrer une ville",
  });

  const modifyMarquers = async (autho) => {
    try {
      if (autho.userId === auth.currentUser.uid || userState.role === "admin") {
        let name = prompt(
          "Indique ton prénom et/ou ton évènement:",
          autho.name
        );
        let photoUrl = prompt(
          "Entre la nouvelle URL de ta photo (ou clique sur ok pour ne pas changer):",
          autho.photoUrl
        );
        let videoUrl = prompt(
          "Entre la nouvelle URL de ta vidéo (ou clique sur ok pour ne pas changer):",
          autho.videoUrl
        );

        const data = {
          name: name,
          photoUrl: photoUrl,
          videoUrl: videoUrl,
        };

        setLoading(true);
        const result = await updateMarquerWithId(autho.id, data);

        alert("Mise à jour faite !");
        if (allMarqueur) {
          const allMarquers = await getMarquersAllInApi();
          if (allMarquers) {
            setDisplayMarquer([...allMarquers]);
            setLoading(false);
            return;
          }
        }
        const allMarquers = await getMarquersWithUidInApi();
        if (allMarquers) {
          setDisplayMarquer([...allMarquers]);
          setLoading(false);
          return;
        }
      } else {
        setLoading(false);
        alert("Tu n' as pas accès à ce marqueur");

        return;
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Oups, un problème est survenu pendant la mise à jour: " + error.message
      );
    }
  };

  const deleteMarquers = async (autho) => {
    try {
      if (autho.userId === auth.currentUser.uid || userState.role === "admin") {
        setLoading(true);
        await deleteMarquerWithId(autho.id);
        if (allMarqueur) {
          const allMarquers = await getMarquersAllInApi();
          if (allMarquers) {
            setDisplayMarquer([...allMarquers]);
            setLoading(false);
            return;
          }
        }
        const allMarquers = await getMarquersWithUidInApi();
        if (allMarquers) {
          setDisplayMarquer([...allMarquers]);
          setLoading(false);
          return;
        }
      } else {
        setLoading(false);
        alert("Tu n' as pas accès à ce marqueur");
        return;
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Oups, un problème est survenu pendant la mise à jour: " + error.message
      );
    }
  };

  const DoubleClickHandler = () => {
    let name = "";
    useMapEvent("dblclick", async (event) => {
      if (!auth.currentUser || userState.status === "desactivate") {
        alert("Tu n'es pas authorisé(e) à entrer des données");
        return;
      }

      name = prompt("Indique ton prénom et/ou ton évènement:");
      if (name) {
        let isCompany = /^entreprise/i.test(name.trim()); // Vérifie si le nom commence par "entreprise"
        let photoUrl, videoUrl, customIconUrl;
        if (isCompany) {
          customIconUrl = prompt(
            "Entre l'URL du favicon de ton entreprise ou ministère:"
          );
          photoUrl = prompt("Entre l'URL de ton logo (ou laisse vide):");
          videoUrl = prompt(
            "Entre l'URL de ta vidéo de présentation (ou laisse vide):"
          );
          isCompany = customIconUrl ? isCompany : false;
        } else {
          photoUrl = prompt("Entre l'URL de ta photo (ou laisse vide):");
          videoUrl = prompt(
            "Entre l'URL de ta vidéo de présentation (ou laisse vide):"
          );
        }

        let newMarker = {
          lat: event.latlng.lat,
          lng: event.latlng.lng,
          name: name.replace(/^entreprise\s*/i, ""),
          isCompany: isCompany,
          customIconUrl: customIconUrl ? customIconUrl : "",
          photoUrl: photoUrl,
          videoUrl: videoUrl,
          userId: auth.currentUser.uid,
        };

        try {
          setLoading(true);
          await addDoc(citiesRef, {
            ...newMarker,
          });

          alert("Bien ajouté !");
          if (allMarqueur) {
            const allMarquers = await getMarquersAllInApi();
            if (allMarquers) {
              setDisplayMarquer([...allMarquers]);
              setLoading(false);
              return;
            }
          }
          const allMarquers = await getMarquersWithUidInApi();
          if (allMarquers) {
            setDisplayMarquer([...allMarquers]);
            setLoading(false);
            return;
          }
        } catch (error) {
          if (error.message === "Missing or insufficient permissions.") {
            setLoading(false);
            alert(
              "Tu n'es pas autorisé(e) à insérer des données Vérifie que tu es connecté(e) ou inscrit(e)"
            );
          } else {
            setLoading(false);
            alert(
              "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
            );
          }
        }
      }
      return null;
    });
  };

  useEffect(() => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
  width: 95vw;
  border-radius: 15px;
  height: 800px;
}
  /*.leaflet-control-geocoder-icon {
        background-color: #f8e71c; /* Couleur de fond du bouton */
        border: 2px solid #e0c92b; /* Bordure du bouton */
        border-radius: 10px; /* Coins arrondis du bouton */
        width: 30px; /* Largeur du bouton */
        height: 30px; /* Hauteur du bouton */
        text-align: center; /* Centrage du texte dans le bouton */
        line-height: 30px; /* Centrage vertical du texte */
        color: #000; /* Couleur du texte dans le bouton */
        font-weight: bold; /* Gras pour un aspect plus visible */
        cursor: pointer; /* Curseur pointer au survol du bouton */
      }
     .leaflet-control-geocoder a, .leaflet-control-geocoder .leaflet-control-geocoder-icon {
    border-bottom: none;
    display: inline-block;
}*/`;
    // Append the style element to the document head
    document.head.appendChild(style);
    const affectStyle = async () => {
      const style2 = await import("leaflet-geosearch/dist/geosearch.css");
      style.innerHTML = style.innerHTML + style2;
    };
    affectStyle();
    // Cleanup the style element when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const getAllMarkers = async () => {
      try {
        const allMarquers = await getMarquersWithUidInApi();
        if (allMarquers) {
          setDisplayMarquer([...allMarquers]);

          return;
        }
      } catch (error) {
        setLoadingFail(true);
      }
    };
    getAllMarkers();
  }, []);
  if (loadingFail) {
    return (
      <div className="failError">
        Une erreur est survenue pendant le chargement ou problème de connexion
      </div>
    );
  }

  return (
    <div className="myBody">
      {loading && <Load />}
      {openManageUser && userState && userState.role === "admin" && (
        <ManageUserCard
          setOpenManageUser={setOpenManageUser}
          setOpenCardAdmin={setOpenCardAdmin}
          setDisplayMarquer={setDisplayMarquer}
          setLoading={setLoading}
        />
      )}

      {openCardAdmin && (
        <CardAdmin
          setOpenManageUser={setOpenManageUser}
          setOpenCardAdmin={setOpenCardAdmin}
          setDisplayMarquer={setDisplayMarquer}
          setAllMarqueur={setAllMarqueur}
          setLoading={setLoading}
        />
      )}

      <div className="myBodySecond">
        {displayLogin && (
          <Login
            setDisplayAdmin={setDisplayAdmin}
            setDisplayConnexionButton={setDisplayConnexionButton}
            setDisplayLogin={setDisplayLogin}
            handleConnexion={handleConnexion}
            setUserState={setUserState}
            setLoading={setLoading}
          />
        )}

        <AllbuttonHeader
          handleConnexion={handleConnexion}
          setDisplayConnexionButton={setDisplayConnexionButton}
          displayConnexionButton={displayConnexionButton}
          displayAdmin={displayAdmin}
          setDisplayAdmin={setDisplayAdmin}
          setDisplayMarquer={setDisplayMarquer}
          setOpenCardAdmin={setOpenCardAdmin}
          userState={userState}
          setLoading={setLoading}
        />

        <MapContainer
          center={[46.6034, 1.8883]}
          zoom={2}
          ref={myfunction}
          doubleClickZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            /* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */
          />
          <MarkerClusterGroup
            chunkedLoading
            /*  iconCreateFunction={creaCustumClusterIcon} */
          >
            {currentUser &&
              userState?.status === "activate" &&
              displayMarquer.length > 0 &&
              displayMarquer.map((value) => {
                return (
                  value.lat && (
                    <Marker
                      position={[value.lat, value.lng]}
                      icon={creaCustumClusterIcon(
                        value.name,
                        value.isCompany,
                        value.customIconUrl
                      )}
                    >
                      <Popup>
                        <div className="popupContainer">
                          <div className="bodyPopup">
                            <div className="bodyDescription">
                              <span className="popupName">
                                {" "}
                                <strong>{value.name}</strong>{" "}
                              </span>
                            </div>
                            {value.photoUrl && (
                              <img
                                src={value.photoUrl}
                                alt=""
                                className="imageCarte"
                              />
                            )}

                            {value.videoUrl &&
                              videoTransformer(value.videoUrl) && (
                                <div className="video relative ">
                                  <iframe
                                    id="about_mp_video_src"
                                    title="vimeo-player"
                                    src={videoTransformer(value.videoUrl)}
                                    className="w-full min-h-[300px] sm:min-h-[400px]"
                                    frameBorder="0"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              )}
                          </div>
                          <div className="buttonPopup">
                            <button
                              onClick={() => deleteMarquers(value)}
                              style={{ backgroundColor: "red", color: "white" }}
                            >
                              X
                            </button>
                            <button
                              onClick={() => modifyMarquers(value)}
                              style={{
                                backgroundColor: "#bd10e0",
                                color: "white",
                              }}
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                );
              })}
          </MarkerClusterGroup>
          {/*  <LeafletControlSearch /> */}
          <MinimapControl position="bottomright" />
          {/*  <Geolocalisation user={sender} /> */}
          <FocusView />
          <DoubleClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
