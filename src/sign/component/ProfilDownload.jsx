import React, { useState, useRef } from "react";
import { cLang } from "../../convertLang";

const ProfileDownload = ({
  setImage,
  statePhoto2,
  setStatePhoto1,
  setStatePhoto2,
  setStatePhoto3,
  lang,
}) => {
  const [showCapture, setShowCapture] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [stateCapture, setStateCapture] = useState(false);
  const [stateDownload, setStateDownload] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCapture = () => {
    setImage({ photo: "", publication: true });
    setStateCapture(true);
    setShowCapture(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current["srcObject"] = stream;
        setStateDownload(true);
      })
      .catch((err) => {});
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      80,
      80
      /*  canvasRef.current.width,
      canvasRef.current.height */
    );
    const photo = canvasRef.current.toDataURL("image/png", 0.4);

    setPhotoURL({ photo });
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const closeCaptureScreen = () => {
    setShowCapture(false);
    setStateCapture(false);
    setPhotoURL(null);
  };

  const retrieveImage = () => {
    if (photoURL) {
      setStatePhoto1(false);
      setStatePhoto2(true);
      setStatePhoto3(false);

      setImage({ photo: photoURL, publication: true });
    }
  };

  return (
    <div className="container">
      {!statePhoto2 && (
        <div onClick={startCapture} className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText">
            {cLang(lang, "Take a photo", "Prendre une photo")}
          </p>
        </div>
      )}

      {statePhoto2 && (
        <div onClick={startCapture} className="textPhoto">
          <span>{">"}</span>{" "}
          <p className="myText" style={{ color: "green" }}>
            {cLang(
              lang,
              "Your photo has been uploaded",
              "Votre photo a été téléchargée",
              "La foto è stata caricata"
            )}
          </p>
        </div>
      )}

      {stateCapture && (
        <div className="captureScreen">
          <div className="smallCaptureScreen">
            <div
              title="Fermer"
              onClick={closeCaptureScreen}
              className="closeElement"
            >
              x
            </div>
            {showCapture && (
              <div id="photo-capture-container">
                <video ref={videoRef} width="300" height="300" autoPlay></video>
                <button onClick={capturePhoto}>
                  {cLang(lang, "Image capture", "Capture Photo")}
                </button>
                <canvas
                  ref={canvasRef}
                  width="300"
                  height="300"
                  className=""
                ></canvas>
              </div>
            )}
            {photoURL && (
              <div>
                <img src={photoURL} alt="Captured" />

                <div className="finalPhoto" onClick={retrieveImage}>
                  {!statePhoto2 && (
                    <p>
                      {cLang(
                        lang,
                        "Click here to download your photo",
                        "Click ici pour la récupération de ta photo",
                        "Clicca qui per recuperare la tua foto"
                      )}
                    </p>
                  )}
                  {statePhoto2 && (
                    <p style={{ color: "green" }}>
                      {cLang(
                        lang,
                        "The image has been saved, you can close and continue",
                        "L'image a été enregistrée, vous pouvez fermer et continuer",
                        "L'immagine è stata salvata, è possibile chiuderla e continuare."
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDownload;
