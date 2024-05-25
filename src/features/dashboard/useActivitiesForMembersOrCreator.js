import { useQuery } from "@tanstack/react-query";
import { getActivitesForMembersOrCreator } from "../../services/apiActivities";

export function useActivitiesForMembersOrCreator() {
  const {
    isLoading,
    data: activities = {},
    error,
  } = useQuery({
    queryKey: ["activitiesForMembersOrCreator"],
    queryFn: getActivitesForMembersOrCreator,
  });

  // console.log("useTask", activites, count);

  return { isLoading, activities, error };
}
