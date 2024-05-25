import { useQuery } from "@tanstack/react-query";
import { getAllActivites } from "../../services/apiActivities";

export function useActivties() {
  const {
    isLoading,
    data: activities = {},
    error,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getAllActivites,
  });

  // console.log("useTask", activites, count);

  return { isLoading, activities, error };
}
