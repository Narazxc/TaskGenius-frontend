import { useQuery } from "@tanstack/react-query";
import { getCollabTasks } from "../../services/apiTasks";
import { useSearchParams } from "react-router-dom";

function useCollabTasks() {
  const [searchParams] = useSearchParams();

  // Log query param from url
  // console.log("in use task", searchParams);

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["collabTask", filter, sortBy],
    queryFn: () => getCollabTasks({ filter, sortBy }),
  });

  return { isLoading, tasks, error };
}

export default useCollabTasks;
