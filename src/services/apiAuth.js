import axios from "axios";
import Cookies from "js-cookie";
import { backendUrl } from "../utils/constants";

// const BASE_URL = "http://localhost:3030/api/v1";

// export async function login({ email, password }) {
//   const res = await fetch(`${BASE_URL}/users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const { data, error } = await res.json();

//   if (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }

//   console.log(res, data);

//   return data;
// }

export async function login({ email, password }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${backendUrl}/users/login`,
      data: {
        email,
        password,
      },
      withCredentials: true,
    });

    const {
      data: {
        data: { user },
        token,
      },
    } = res;

    // console.log(user);
    // console.log(token);

    return user;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

export async function signUp({ name, email, password, passwordConfirm }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${backendUrl}/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });

    const {
      data: {
        data: { user },
        token,
      },
    } = res;

    console.log(user);
    console.log(token);

    return user;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

export async function getCurrentUser() {
  // Check if token exist else set user to null
  const token = Cookies.get("jwt");
  if (!token) return null;

  // Decode token to get user id
  // const decoded = jwtDecode(token);
  // const userId = decoded.id;

  // Request with the id to get the current user from backend
  const res = await fetch(`${backendUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await res.json();
  // console.log(user);
  return user;
}

export async function logout() {
  Cookies.remove("jwt");
}
