import { BASE_URL } from "./apiTasks";
import Cookies from "js-cookie";

export async function getMyPreference() {
  const token = Cookies.get("jwt");

  let url = `${BASE_URL}/preferences`;

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data: { preference },
    } = await res.json();

    // console.log(preference);

    return preference;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePreference(newPreferenceData, id) {
  // console.log("in api", newTaskData, id);
  console.log("in api", newPreferenceData, id);
  console.log(`${BASE_URL}/preferences/${id}`);

  const token = Cookies.get("jwt");

  const res = await fetch(`${BASE_URL}/preferences/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPreferenceData),
  });
  const {
    data: { preference },
  } = await res.json();

  // console.log(preference);

  return preference;
}
