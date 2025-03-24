export const cLang = (lang, texten, textfr, textIt) => {
  if (lang === "Français") {
    return textfr;
  } else if (lang === "Italiano") {
    return textIt;
  }
  return texten;
};
