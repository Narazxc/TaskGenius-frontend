import { useQuery } from "@tanstack/react-query";
import { getMyTasks } from "../../services/apiTasks";
import { useSearchParams } from "react-router-dom";

export function useTasks() {
  const [searchParams] = useSearchParams();

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

  // PAGINATION
  // const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: tasks = {},
    error,
  } = useQuery({
    queryKey: ["tasks", filter, sortBy],
    queryFn: () => getMyTasks({ filter, sortBy }),
  });

  // console.log("useTask", tasks, count);

  return { isLoading, tasks, error };
}

// isLoading,
// data: tasks = {},
// count,
// error,
