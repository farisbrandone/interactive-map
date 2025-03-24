import React from "react";
import "./CustumRadioButton.css";

const CustomRadioButton = ({ label, checked, onChange, value }) => {
  return (
    <label className="custom-radio">
      <input type="radio" checked={checked} onChange={onChange} value={value} />
      <span className="custom-radio-button"></span>
      {label}
    </label>
  );
};

export default CustomRadioButton;
