import React, { useState } from "react";

export const Toast = ({ message, show, error }) => {
  return (
    <div className={`toast ${show ? "show" : ""} ${error ? "error" : ""}`}>
      {message}
    </div>
  );
};

const ToastApp = ({ message, error }) => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide the toast after 3 seconds
  };

  return (
    <div>
      <button onClick={handleShowToast}>Show Toast</button>
      <Toast message={message} show={showToast} error={error} />
    </div>
  );
};

export default ToastApp;
