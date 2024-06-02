import Cookies from "js-cookie";
import { backendUrl } from "../utils/constants";
// import { BASE_URL } from "./apiTasks";

export async function updateCurrentUser({
  name,
  passwordCurrent,
  password,
  passwordConfirm,
  photo,
}) {
  const token = Cookies.get("jwt");

  // 1. Update password OR name
  let updateData;
  let url;

  const isUpdatePassword = passwordCurrent && password && passwordConfirm;

  if (isUpdatePassword) {
    url = `${backendUrl}/users/updateMyPassword`;
    console.log("hello", url);
  } else if (name || photo) {
    url = `${backendUrl}/users/updateMe`;
  } else {
    return;
  }

  updateData = new FormData();
  if (isUpdatePassword) {
    updateData = JSON.stringify({ passwordCurrent, password, passwordConfirm });
  } else if (name && photo) {
    updateData.append("name", name);
    updateData.append("photo", photo);
  } else if (name) {
    updateData.append("name", name);
  } else if (photo) {
    updateData.append("photo", photo);
  } else {
    return;
  }

  // console.log(url, updateData);
  // console.log(isUpdatePassword);

  let headers;
  if (isUpdatePassword) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(url, {
    method: "PATCH", // or 'PUT'
    headers,
    body: updateData,
  });

  const {
    data: { user },
  } = await res.json();

  // console.log(user);

  return user;
}

export async function getUsersToAddToTask() {
  // Check if token exist else set user to null
  const token = Cookies.get("jwt");

  const res = await fetch(`${backendUrl}/users/toAddToTask`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  // console.log("in api", a.data.users[0]);
  // console.log(a);

  return data;
}

// Admin
export async function getAllUsers({ filter, sortBy }) {
  // Check if token exist else set user to null
  const token = Cookies.get("jwt");

  let url = `${backendUrl}/users`;

  // if (filter) {
  //   const filterValue = filter.value.replace("-", " ");
  //   // console.log(filter.value.replace("-", " "));

  //   url = `${BASE_URL}/tasks/my-tasks?${filter.field}=${filterValue}`;
  //   console.log(url);
  // }

  if (filter != null && sortBy) {
    const filterValue = filter.value.replace("-", " ");

    // Construct url
    url = `${url}?${filter.field}=${filterValue}&sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;

    console.log("both", url);
  } else if (filter === null && sortBy) {
    url = `${url}?sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;
  }

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    data: { data: users },
  } = await res.json();

  // console.log("in api", a.data.users[0]);
  // console.log(a);

  return users;
}

export async function deleteUser(id) {
  // const token = Cookies.get("jwt");

  console.log(`user ${id} deleted`);

  // const res = await fetch(`${BASE_URL}/users/${id}`, {
  //   method: "DELETE",
  //   credentials: "include",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // if (!res.ok) {
  //   console.error(`HTTP error! Status: ${res.status}`);
  //   throw new Error("User could not be deleted");
  // }

  // // Check if the response status is 204 (No Content)
  // if (res.status === 204) {
  //   return null; // No need to parse an empty response
  // }
}
