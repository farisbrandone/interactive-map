import axios from "axios";
import { baseUrl } from "../../page/lib/createUser";

export const getAllData = async () => {
  const users = [];

  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const resultSignup = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Authorization ${token.accessToken}`,
      },
    });

    if (resultSignup.status === 200) {
      return resultSignup.data;
    }

    if (resultSignup.status === 202) {
      const tokendata = { refreshToken: token.refreshToken };
      const result = await axios.post(
        `${baseUrl}/authenticate/refresh-token`,
        tokendata
      );

      if (result.status === 404 || result.status === 403) {
        throw new Error("Internal server error");
      }

      if (result.status === 200) {
        const tokenStorage = JSON.stringify(result.data.tokens);

        localStorage.setItem("token", tokenStorage);
        const result3 = await axios.get(`${baseUrl}/users`, {
          headers: {
            Authorization: `Authorization ${result.data.tokens.accessToken}`,
          },
        });

        if (result3.status === 200) {
          return result3.data;
        }
      } else {
        throw new Error("Internal server error");
      }
    }
  } catch (error) {
    throw new Error("Une erreur est survenue");
  }
};

export async function deleteUser(id) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const resultSignup = await axios.delete(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Authorization ${token.accessToken}`,
      },
    });

    if (resultSignup.status === 200) {
      return resultSignup.data;
    }

    if (resultSignup.status === 202) {
      const tokendata = { refreshToken: token.refreshToken };
      const result = await axios.post(
        `${baseUrl}/authenticate/refresh-token`,
        tokendata
      );

      if (result.status === 404 || result.status === 403) {
        throw new Error("Internal server error");
      }

      if (result.status === 200) {
        const tokenStorage = JSON.stringify(result.data.tokens);
        localStorage.setItem("token", tokenStorage);
        const result2 = await axios.delete(`${baseUrl}/users/${id}`, {
          headers: {
            Authorization: `Authorization ${result.data.tokens.accessToken}`,
          },
        });

        if (result2.status === 200) {
          return result2.data;
        } else {
          throw new Error("Internal server error");
        }
      }
      throw new Error("Internal server error");
    }
    throw new Error("Internal server error");
  } catch (error) {
    throw new Error("Internal server error");
  }
}

export const updateUserWithParams = async (data, user) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const resultSignup = await axios.put(`${baseUrl}/users/${user.id}`, data, {
      headers: {
        Authorization: `Authorization ${token.accessToken}`,
      },
    });

    if (resultSignup.status === 200) {
      return resultSignup.data;
    }

    if (resultSignup.status === 202) {
      const tokendata = { refreshToken: token.refreshToken };
      const result = await axios.post(
        `${baseUrl}/authenticate/refresh-token`,
        tokendata
      );

      if (result.status === 404 || result.status === 403) {
        throw new Error("Internal server error");
      }

      if (result.status === 200) {
        const tokenStorage = JSON.stringify(result.data.tokens);
        localStorage.setItem("token", tokenStorage);

        const result2 = await axios.put(`${baseUrl}/users/${user.id}`, data, {
          headers: {
            Authorization: `Authorization ${result.data.tokens.accessToken}`,
          },
        });

        if (result2.status === 200) {
          return result2.data;
        } else {
          throw new Error("Internal server error");
        }
      }
      throw new Error("Internal server error");
    }

    throw new Error("Internal server error");
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getUsersByParams = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const resultSignup = await axios.get(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Authorization ${token.accessToken}`,
    },
  });

  if (resultSignup.status === 200) {
    return resultSignup.data;
  }

  if (resultSignup.status === 202) {
    const tokendata = { refreshToken: token.refreshToken };
    const result = await axios.post(
      `${baseUrl}/authenticate/refresh-token`,
      tokendata
    );

    if (result.status === 404 || result.status === 403) {
      throw new Error("Internal server error");
    }

    if (result.status === 200) {
      const tokenStorage = JSON.stringify(result.data.tokens);
      localStorage.setItem("token", tokenStorage);

      const result2 = await axios.get(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Authorization ${result.data.tokens.accessToken}`,
        },
      });

      if (result2.status === 200) {
        return result2.data;
      } else {
        throw new Error("Internal server error");
      }
    }
    throw new Error("Internal server error");
  }

  throw new Error("Internal server error");
};

export const sendMessageToContact = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("a");
  const resultSignup = await axios.post(
    `${baseUrl}/users/send-contact-message`,
    data,
    {
      headers: {
        Authorization: `Authorization ${token.accessToken}`,
      },
    }
  );

  if (resultSignup.status === 201) {
    return resultSignup.data;
  }

  if (resultSignup.status === 202) {
    const tokendata = { refreshToken: token.refreshToken };
    const result = await axios.post(
      `${baseUrl}/authenticate/refresh-token`,
      tokendata
    );

    if (result.status === 404 || result.status === 403) {
      throw new Error("Internal server error");
    }

    if (result.status === 200) {
      const tokenStorage = JSON.stringify(result.data.tokens);
      localStorage.setItem("token", tokenStorage);

      const result2 = await axios.post(
        `${baseUrl}/users/send-contact-message`,
        data,
        {
          headers: {
            Authorization: `Authorization ${token.accessToken}`,
          },
        }
      );

      if (result2.status === 200) {
        return result2.data;
      } else {
        throw new Error("Internal server error");
      }
    }
    throw new Error("Internal server error");
  }

  throw new Error("Internal server error");
};
