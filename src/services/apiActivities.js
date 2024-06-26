import { BASE_URL } from "./apiTasks";
import Cookies from "js-cookie";

export async function getAllActivites() {
  const token = Cookies.get("jwt");

  try {
    const res = await fetch(`${BASE_URL}/activities`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { activities },
    } = await res.json();

    // console.log(activities);

    return activities;
  } catch (err) {
    console.log(err);
  }
}

export async function getActivitesForMembersOrCreator() {
  const token = Cookies.get("jwt");

  try {
    const res = await fetch(`${BASE_URL}/activities/forMembers`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { activities },
    } = await res.json();

    // console.log(activities);

    return activities;
  } catch (err) {
    console.log(err);
  }
}
