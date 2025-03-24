export function verifyPassword(password) {
  // Define the conditions
  const lengthCondition = password.length >= 8;
  /*  const uppercaseCondition = /[A-Z]/.test(password); */
  const lowercaseCondition = /[a-z]/.test(password);
  const digitCondition = /\d/.test(password);
  const specialCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check all conditions
  let message = "Le mot de passe doit contenir :";
  if (!lengthCondition) message += "\n- Au moins 8 caractères";
  /*  if (!uppercaseCondition) message += "\n- Une lettre majuscule"; */
  if (!lowercaseCondition) message += "\n- Une lettre minuscule";
  if (!digitCondition) message += "\n- Un chiffre";
  if (!specialCharCondition) message += "\n- Un caractère spécial";

  if (
    lengthCondition &&
    /*  uppercaseCondition && */
    lowercaseCondition &&
    digitCondition &&
    specialCharCondition
  ) {
    return { message: "Password is strong!", success: true, color: "green" };
  } else {
    return { message: message, success: false, color: "green" };
  }
}

export const videoTransformer = (urli) => {
  let url = urli;
  if (urli.includes("</iframe>")) {
    url = urli.split('src="')[1].split('"')[0];
  }
  const vimeoPattern =
    /^(https:\/\/player\.vimeo\.com\/video\/)(\d+)(\?h=([a-zA-Z0-9]+))?$/;
  const wistiaPattern =
    /^(https:\/\/fast\.wistia\.net\/embed\/iframe\/)([a-zA-Z0-9]+)$/;
  let dataString = "";
  if (url?.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i)) {
    dataString = "";
    if (url?.match(/(?:youtu)(?:\.com|\.be)\/([\w\W]+)/i)) {
      dataString = url.replace(/youtu/i, "youtube");
      const data = dataString.split("/");
      data.splice(data.length - 1, 0, "embed");
      dataString = data.join("/");
      return dataString;
    } else {
      if (url.split("/").includes("shorts")) {
        dataString = url.replace(/shorts/i, "embed");

        return dataString;
      } else {
        let id = url.split("?v=")[1]; //sGbxmsDFVnE

        var embedlink = "https://www.youtube.com/embed/" + id; //www.youtube.com/embed/sGbxmsDFVnE
        return embedlink;
      }
    }
  }

  if (vimeoPattern.test(url)) {
    return url;
  } else if (wistiaPattern.test(url)) {
    return url;
  }

  if (url.includes(".mp4")) {
    return url;
  }

  return "";
};
