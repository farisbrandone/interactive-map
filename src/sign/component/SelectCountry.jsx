import React, { Fragment } from "react";
import { FranceFlag } from "../icon/FranceFlag";
import { BritishFlag } from "../icon/BritishFlag";

function SelectCountry({ lang, setLang, isMobile }) {
  const countryOptions = [
    {
      value: "English",
      label: (
        <div>
          <BritishFlag />
          {!isMobile ? "English" : "E"}
        </div>
      ),
    },
    {
      value: "Français",
      label: (
        <div>
          <FranceFlag />
          {!isMobile ? "Français" : "F"}
        </div>
      ),
    },
    {
      value: "Italiano",
      label: (
        <div>
          <FranceFlag />
          {!isMobile ? "Italiano" : "I"}
        </div>
      ),
    },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {lang === "Français" ? (
        <img src="/carte/fr.png" alt="France Flag" width="20" height="15" />
      ) : lang === "Italiano" ? (
        <img src="/carte/it.png" alt="Italian Flag" width="20" height="15" />
      ) : (
        <img src="/carte/gb.png" alt="british Flag" width="20" height="15" />
      )}
      <select
        className="selectCountry"
        name=""
        id=""
        value={lang}
        style={{
          border: "none",
          fontSize: "14px",
          padding: "1px",
          color: "black",
        }}
        onChange={(e) => setLang(e.target.value)}
      >
        {countryOptions.map((value, index) => (
          <option style={{ color: "#000" }} key={index} value={value.value}>
            {" "}
            {value.label}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCountry;
