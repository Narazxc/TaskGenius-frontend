import { useEffect, useState } from "react";
import { BASE_URL } from "../../services/apiTasks";
import Cookies from "js-cookie";

export function useMyTasks(taskQuery) {
  const [myTasks, setMyTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      const token = Cookies.get("jwt");

      async function getTask() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `${BASE_URL}/tasks/my-tasks?name=${taskQuery}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            },
          );

          const { data, error } = await res.json();

          if (error) {
            // console.error(error);
            throw new Error("Task could not be created");
          }

          //   console.log(data.tasks);
          setMyTasks(data.tasks);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            // console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      getTask();

      return function () {
        controller.abort();
      };
    },
    [taskQuery],
  );

  return { myTasks, isLoading, error };
}
