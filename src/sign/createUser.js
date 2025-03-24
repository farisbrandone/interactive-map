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
