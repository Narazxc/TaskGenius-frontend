// import { backendUrl } from "../utils/constants";
import { BASE_URL } from "./apiTasks";
import Cookies from "js-cookie";

export async function markAllMyNotificationsAsRead() {
  const token = Cookies.get("jwt");

  // console.log("hello in api");

  await fetch(`${BASE_URL}/notifications/myNotifications/`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMyNotifications() {
  const token = Cookies.get("jwt");

  let url = `${BASE_URL}/notifications/myNotifications`;

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data: { notifications },
    } = await res.json();

    // console.log(notifications);

    return notifications;
  } catch (err) {
    console.log(err);
  }
}

export async function updateNotification(newNotificationData, id) {
  // console.log("new notifi data", newNotificationData);
  // console.log("in api", newNotificationData, id);
  const token = Cookies.get("jwt");

  const res = await fetch(`${BASE_URL}/notifications/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newNotificationData),
  });

  const {
    data: { notification },
  } = await res.json();

  // console.log(notification);

  return notification;
}
