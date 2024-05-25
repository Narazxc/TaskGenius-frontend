import Cookies from "js-cookie";
import { BASE_URL } from "./apiTasks";

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
    url = `${BASE_URL}/users/updateMyPassword`;
    console.log("hello", url);
  } else if (name || photo) {
    url = `${BASE_URL}/users/updateMe`;
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

  console.log(url, updateData);
  console.log(isUpdatePassword);

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

  const res = await fetch(`${BASE_URL}/users/toAddToTask`, {
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
