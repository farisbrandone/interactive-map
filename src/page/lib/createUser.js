import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = async (email, motsDepasse, auth) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      motsDepasse
    );

    return {
      result,
      alreadyExist: false,
    };
  } catch (error) {
    return {
      result: null,
      alreadyExist: true,
    };
  }
};
export const baseUrl = "https://adminnode-adzkyuspnq-uc.a.run.app";

/* 
http://127.0.0.1:5001/un-truc-de-jesus-carte/us-central1/adminnode

https://adminnode-adzkyuspnq-uc.a.run.app

*/
