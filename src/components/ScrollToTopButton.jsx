import React, { useState, useEffect } from "react";
import { UpIcon } from "../page/icon/UpIcon";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show or hide the button based on scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} style={buttonStyle}>
          <UpIcon width="1.17em" height="1em" />
        </button>
      )}
    </div>
  );
}

const buttonStyle = {
  position: "fixed",
  bottom: "70px",
  right: "10px",
  padding: "15px 15px",
  fontSize: "16px",
  backgroundColor: "#a7a7a7",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  zIndex: "100000000000000000",
};

export default ScrollToTopButton;
