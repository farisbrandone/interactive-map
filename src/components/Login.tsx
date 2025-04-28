import { signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { auth } from "../../firebaseConfig";
import { baseUrl, createUser } from "../page/lib/createUser";

import { getUsersWithUidInApi } from "../../api/getCountryData";

function Login({
  setDisplayAdmin,
  setDisplayLogin,
  setDisplayConnexionButton,
  setUserState,
  setLoading,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [startLoading, setStartLoading] = useState(false);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStartLoading(true);
      setLoading(true);
      const dd = email.trim();

      const response = await fetch(
        `${baseUrl}/api/carte/verify_email/${dd}-${password}`
      );
      const adminUid = await response.json();

      if (adminUid.value && adminUid.role === "admin") {
        //await createUser(email, password, auth);
        const usercred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setDisplayAdmin(true);
        setDisplayLogin(false);
        setDisplayConnexionButton(false);
        const data = {
          email: usercred.user.email,
          uid: usercred.user.uid,
          role: "admin",
          status: "activate",
        };

        const userData = await getUsersWithUidInApi(data);

        setUserState({ ...userData });
        setStartLoading(false);
        setLoading(false);
        return;
      }

      if (adminUid.value && adminUid.role === "user") {
        //await createUser(email, password, auth);
        const usercred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setDisplayAdmin(false);
        setDisplayLogin(false);
        setDisplayConnexionButton(false);
        const data = {
          email: usercred.user.email,
          uid: usercred.user.uid,
          role: "user",
          status: "activate",
        };

        const userData = await getUsersWithUidInApi(data);

        setUserState({ ...userData });
        setStartLoading(false);
        setLoading(false);
        return;
      } else {
        setStartLoading(false);
        setLoading(false);
        setDisplayLogin(false);
        alert(
          "Erreur de connexion par email. Si tu ne l'as pas encore fait, Inscrit toi sur le réseau social ✨✨✨ Un Truc de JÉSUS ! ✨✨✨ pour accéder à la carte"
        );
        return;
      }
    } catch (error) {
      setStartLoading(false);
      setLoading(false);
      setDisplayLogin(false);
      alert(
        "Erreur de connexion par email. Si tu ne l'as pas encore fait, Inscrit toi sur le réseau social ✨✨✨ Un Truc de JÉSUS ! ✨✨✨ pour accéder à la carte"
      );
    }
  };

  return (
    <div className="loginIsabFirst">
      <div className="loginSecond">
        <form onSubmit={handleSubmit} className="formIs">
          <div className="inputIs">
            <label htmlFor="forEmail">Entre ton email</label>
            <input
              type="text"
              id="forEmail"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="inputIs">
            <label htmlFor="forPassword">Entre ton mot de passe</label>
            <input
              type="text"
              id="forPassword"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button type="submit" className="isconnexion" disabled={startLoading}>
            {" "}
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
