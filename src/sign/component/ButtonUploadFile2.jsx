import React, { Fragment, useState } from "react";
import { compressImage2 } from "../function/compressImage";
import { cLang } from "../../convertLang";
import { Toast } from "./Toast";

function ButtonUploadFile2({
  name,
  valueForHtml,
  setImageUrl,
  statePhoto3,
  setStatePhoto1,
  setStatePhoto2,
  setStatePhoto3,
  lang,
}) {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setMessage("");
      setErr(false);
    }, 3000); // Hide the toast after 3 seconds
  };

  const handleFileChange = async (e) => {
    console.log("gabon");
    setImageUrl({ photo: "", publication: true });
    e.preventDefault();

    setStatePhoto2(false);
    setStatePhoto1(false);
    if (!e?.target.files) {
      setStatePhoto3(false);
      return;
    }
    const file = e.target.files;

    const supportedFormats = [
      "image/jpg",
      "image/png",
      "image/gif",
      "image/jpeg",
    ];
    if (e?.target.files[0] && e?.target.files[0].type) {
      if (0 > supportedFormats.indexOf(e?.target.files[0].type)) {
        setMessage(
          cLang(
            lang,
            "The file is not an image",
            "Le fichier n'est pas une image",
            "Il file non è un'immagine"
          )
        );
        setErr(true);
        handleShowToast();
        setStatePhoto3(false);
        return;
      }
    }

    if (e?.target.files.size > 1048576 * 3) {
      setMessage(
        cLang(
          lang,
          "File size exceeds 3MB",
          "La taille du fichier est supérieure à 3 Mo",
          "Dimensione del file superiore a 3 MB"
        )
      );
      setErr(true);
      handleShowToast();
      setStatePhoto3(false);
      return;
    }

    const result = await compressImage2(file, 80, 80, 0.4);
    console.log(result);
    setImageUrl({ ...result });
    setStatePhoto3(true);
  };
  return (
    <Fragment>
      <Toast message={message} show={showToast} error={err} />
      <label htmlFor={valueForHtml} className="labelTelecharger ">
        {!statePhoto3 && (
          <div className="textPhoto">
            <span>{">"}</span>{" "}
            <p className="myText">
              {cLang(
                lang,
                "Don't want to publish my photo",
                "Ne souhaite pas publier ma photo",
                "Non voglio pubblicare la mia foto"
              )}
            </p>
          </div>
        )}

        {statePhoto3 && (
          <div className="textPhoto">
            <span>{">"}</span>{" "}
            <p className="myText" style={{ color: "green" }}>
              {cLang(
                lang,
                "Your photo will not be published.",
                "Votre photo ne sera pas publiée.",
                "La vostra foto non sarà pubblicata."
              )}
            </p>
          </div>
        )}

        <input
          name={name}
          id={valueForHtml}
          type="file"
          className="inputTelecharger"
          onChange={handleFileChange}
        />
      </label>
    </Fragment>
  );
}

export default ButtonUploadFile2;
