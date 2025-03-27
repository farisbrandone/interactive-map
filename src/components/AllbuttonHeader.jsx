import React from "react";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import {
  getMarquersAllInApi,
  getMarquersWithUidInApi,
} from "../../api/getCountryData";

function AllbuttonHeader({
  setDisplayAdmin,
  setDisplayConnexionButton,
  displayConnexionButton,
  displayAdmin,
  handleConnexion,
  setDisplayMarquer,
  setOpenCardAdmin,
  setAllMarqueur,
  userState,
  setLoading,
}) {
  const getAllMarquer = async () => {
    try {
      setLoading(true);
      const allMarquers = await getMarquersAllInApi();
      if (allMarquers) {
        setDisplayMarquer([...allMarquers]);
        setAllMarqueur(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(
        "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
      );
    }
  };

  const getMyMarquer = async () => {
    try {
      setLoading(true);
      const allMarquers = await getMarquersWithUidInApi();
      if (allMarquers) {
        setDisplayMarquer([...allMarquers]);
        setAllMarqueur(false);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(
        "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDisplayConnexionButton(true);
      setDisplayAdmin(false);
    } catch (error) {}
  };

  const handleOpenAdmin = async () => {
    try {
      setOpenCardAdmin(true);
    } catch (error) {}
  };

  return (
    <>
      {displayConnexionButton ? (
        <div className="isbuttonlogin">
          <button className="isconnexion" onClick={handleConnexion}>
            Se connecter
          </button>
        </div>
      ) : userState?.role === "user" && !displayConnexionButton ? (
        <div className="isbuttonconnected">
          <button className="isconnexion" onClick={getAllMarquer}>
            Tous les marqueurs
          </button>
          <button className="isconnexion" onClick={getMyMarquer}>
            Mes marqueurs
          </button>
          <button className="isdeconnexion" onClick={handleLogout}>
            Deconnexion
          </button>
        </div>
      ) : userState?.role === "admin" && !displayConnexionButton ? (
        <div className="isbuttonconnected">
          <button className="isconnexion" onClick={handleOpenAdmin}>
            Adminitrateur
          </button>
          <button className="isdeconnexion" onClick={handleLogout}>
            Deconnexion
          </button>
        </div>
      ) : (
        <div className="isbuttonlogin">
          <button className="isconnexion" onClick={handleConnexion}>
            Se connecter
          </button>
        </div>
      )}
    </>
  );
}

export default AllbuttonHeader;
