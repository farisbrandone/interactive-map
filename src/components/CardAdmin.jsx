import React, { useState } from "react";
import {
  getMarquersAllInApi,
  getMarquersWithUidInApi,
} from "../../api/getCountryData";

function CardAdmin({
  setOpenManageUser,
  setOpenCardAdmin,
  setDisplayMarquer,
  setAllMarqueur,
  setLoading,
}) {
  const [desableMarq, setDisableMarq] = useState(false);
  const [desableTous, setDisableTous] = useState(false);

  const getAllMarquer = async () => {
    try {
      setLoading(true);
      setDisableTous(true);
      const allMarquers = await getMarquersAllInApi();

      if (allMarquers) {
        setDisplayMarquer([...allMarquers]);
        setLoading(false);
        setAllMarqueur(true);
        setOpenCardAdmin(false);
        setOpenManageUser(false);

        setDisableTous(false);

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
      setDisableMarq(true);
      const allMarquers = await getMarquersWithUidInApi();

      if (allMarquers) {
        setDisplayMarquer([...allMarquers]);
        setLoading(false);
        setAllMarqueur(false);
        setOpenCardAdmin(false);
        setOpenManageUser(false);
        setDisableMarq(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Une erreur est survenue pendant le chargement des données vérifie ta connexion internet"
      );
    }
  };
  const handleOpenManageUser = async () => {
    setOpenCardAdmin(false);
    setOpenManageUser(true);
  };

  return (
    <div className="cardAdmin">
      <div className="adminContainer">
        <button
          disabled={desableMarq}
          className="isconnexion2mm"
          onClick={getMyMarquer}
        >
          Mes Coeurs
        </button>
        <button
          disabled={desableTous}
          className="isconnexionmesmarquers"
          onClick={getAllMarquer}
        >
          Tous les Coeurs
        </button>
        <button className="isdeconnexionadmin" onClick={handleOpenManageUser}>
          Gérer les utilisateurs
        </button>
        <button
          className="isretour"
          onClick={() => {
            setOpenCardAdmin(false);
            setOpenManageUser(false);
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
}

export default CardAdmin;
