import Cookies from "js-cookie";
import { PAGE_SIZE, backendUrl } from "../utils/constants";

export const BASE_URL = "http://127.0.0.1:3030/api/v1";

export async function getTasks() {
  const token = Cookies.get("jwt");

  try {
    const res = await fetch(`${backendUrl}/tasks`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { tasks },
    } = await res.json();

    // console.log(tasks);

    // console.log(result);
    // console.log(status);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}

export async function getTask(id) {
  const token = Cookies.get("jwt");
  // console.log(`${BASE_URL}/tasks/${id}`);

  const res = await fetch(`${backendUrl}/tasks/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data, error } = await res.json();

  if (error) {
    // console.error(error);
    if (error.statusCode === 404) {
      throw new Error("No document found with that ID");
    }
  }

  return data.data;
}

export async function getMyTasks({ filter, sortBy, page }) {
  // console.log(filter);
  const token = Cookies.get("jwt");

  let url = `${backendUrl}/tasks/my-tasks`;

  // if (filter) {
  //   const filterValue = filter.value.replace("-", " ");
  //   // console.log(filter.value.replace("-", " "));

  //   url = `${BASE_URL}/tasks/my-tasks?${filter.field}=${filterValue}`;
  //   console.log(url);
  // }

  // If sort by priority, use priorityIndex property to sort
  if (sortBy.field === "priority") {
    sortBy.field = "priorityIndex";
  }

  if (filter != null && sortBy) {
    const filterValue = filter.value.replace("-", " ");

    // Construct url
    url = `${url}?${filter.field}=${filterValue}&sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;

    // console.log("both", url);
  } else if (filter === null && sortBy) {
    url = `${url}?sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;
  }

  // &page=${page}&limit=${PAGE_SIZE}

  // console.log("url", url);
  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { tasks },
      // count,
    } = await res.json();

    // console.log("count", count);

    // console.log(tasks);

    // console.log(result);
    // console.log(status);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}

// export async function getTasks() {
//   try {
//     const token = Cookies.get("jwt");
//     const res = await axios.get(BASE_URL + "/tasks", {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(token);
//     // return res.response.data;
//     console.log(res);
//   } catch (err) {
//     console.log(err.response.data);
//   }
// }

// Get collab task

export async function createTask(newTask) {
  const token = Cookies.get("jwt");

  const res = await fetch(`${backendUrl}/tasks`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(newTask),
  });

  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    if (error.code === 11000)
      throw new Error("Task could not have the same name");
  }

  // console.log(res, data);

  return data;
}

export async function createCollabTask(newTask) {
  const token = Cookies.get("jwt");

  const res = await fetch(`${backendUrl}/tasks/collaboration`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(newTask),
  });

  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Task could not be created");
  }

  console.log(res, data);

  return data;
}

export async function deleteTask(id) {
  const token = Cookies.get("jwt");

  const res = await fetch(`${backendUrl}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(token);

  if (!res.ok) {
    console.error(`HTTP error! Status: ${res.status}`);
    throw new Error("Task could not be deleted");
  }

  // Check if the response status is 204 (No Content)
  if (res.status === 204) {
    return null; // No need to parse an empty response
  }
}

export async function updateTask(newTaskData, id) {
  // console.log("in api", newTaskData, id);
  const token = Cookies.get("jwt");

  const res = await fetch(`${backendUrl}/tasks/${id}`, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTaskData),
  });
  const {
    data: { task },
  } = await res.json();

  // console.log(task);

  return task;
}

export async function getCollabTasks({ filter, sortBy }) {
  const token = Cookies.get("jwt");
  let url = `${backendUrl}/tasks/collaboration`;

  // If sort by priority, use priorityIndex property to sort
  if (sortBy.field === "priority") {
    sortBy.field = "priorityIndex";
  }

  if (filter != null && sortBy) {
    const filterValue = filter.value.replace("-", " ");

    // Construct url
    url = `${url}?${filter.field}=${filterValue}&sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;

    // console.log("both", url);
  } else if (filter === null && sortBy) {
    url = `${url}?sort=${
      sortBy.direction === "asc" ? `${sortBy.field}` : `-${sortBy.field}`
    }`;

    // console.log("sort", url);
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { tasks },
    } = await res.json();

    // console.log(tasks);
    // console.log(result);
    // console.log(status);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}
