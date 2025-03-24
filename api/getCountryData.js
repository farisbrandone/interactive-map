import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { baseUrl } from "../src/page/lib/createUser";

export async function getCountryData() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}

export async function getCityOfCountry() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN/cities",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}

export async function getCityData() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN/cities",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}

export const citiesRef = collection(db, "markers");

export async function getMarquersAllInApi() {
  try {
    const user = auth.currentUser;
    let markers = [];
    if (user) {
      const q = citiesRef;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        markers.push({ id: doc.id, ...doc.data() });
      });

      return markers;
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    throw new Error("User doesn't exist");
  }
}

export async function getMarquersWithUidInApi() {
  try {
    const user = auth.currentUser;
    let markers = [];
    if (user) {
      const q = query(citiesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        markers.push({ id: doc.id, ...doc.data() });
      });

      return markers;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMarquersAdminWithUid(uid) {
  try {
    const user = auth.currentUser;
    let markers = [];
    if (user && user.uid === uid) {
      const q = query(citiesRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        markers.push({ id: doc.id, ...doc.data() });
      });

      return markers;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUsersWithUidInApi(data) {
  try {
    const user = auth.currentUser;
    let users = [];
    const userRef = collection(db, "UserOfCarte");

    if (user) {
      const q = query(userRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      if (users.length === 0) {
        const result = await addDoc(userRef, data);
        return { id: result.id, ...data };
      }

      return users[0];
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    console.log(error);
    throw new Error("User doesn't exist");
  }
}

export async function getMarquerWithId(id) {
  const marquerRef = doc(citiesRef, id);
  const markers = await getDoc(marquerRef);

  if (markers.exists()) {
    return { id: markers.id, ...markers.data() };
  }
}

export async function updateMarquerWithId(id, data) {
  const marquerRef = doc(citiesRef, id);
  try {
    await updateDoc(marquerRef, { ...data });
    return { authoriser: true };
  } catch (error) {
    throw new Error("Une erreur est survenue, vérifier votre connexion");
  }
}

export async function updateUserWithId(id, data) {
  const userRef = collection(db, "UserOfCarte");
  const marquerRef = doc(userRef, id);
  try {
    await updateDoc(marquerRef, { ...data });
    return { authoriser: true };
  } catch (error) {
    throw new Error("Une erreur est survenue, vérifier votre connexion");
  }
}

export async function deleteMarquerWithId(id) {
  const marquerRef = doc(citiesRef, id);
  try {
    await deleteDoc(marquerRef);
    return;
  } catch (error) {
    throw new Error("Une erreur est survenue, vérifier votre connexion");
  }
}

export async function adminGetAllUser() {
  try {
    //const response = await fetch(`${baseUrl}/api/carte/all_users`);
    if (true) {
      let markers = [];

      const q = collection(db, "UserOfCarte");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        markers.push({ id: doc.id, ...doc.data() });
      });
      console.log(markers);
      return markers;
    } else {
      throw new Error("Une erreur est survenue, vérifier votre connexion");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Une erreur est survenue, vérifier votre connexion");
  }
}
