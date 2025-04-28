import React from "react";

function DeleteComponent({ deleteMarquers, valueTodelete, setOpenDelete }) {
  return (
    <div className="loginIsabFirst">
      <div className="deleteSecond">
        <div className="deleteText">
          <p className="deleFirstText">Es-tu vraiment sûr(e)?</p>
          <p className="deleteSecondText">
            Cette croix efface intégralement le coeur
          </p>
        </div>
        <div className="partdelete">
          <button
            className="deleteAnnuler"
            onClick={() => setOpenDelete(false)}
          >
            Annuler
          </button>
          <button
            className="deleteSupprimer"
            onClick={() => deleteMarquers(valueTodelete)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteComponent;
