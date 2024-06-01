import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";

export function useUsers() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("role");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "role", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: users = {},
    error,
  } = useQuery({
    queryKey: ["users", filter, sortBy],
    queryFn: () => getAllUsers({ filter, sortBy }),
  });

  // console.log("useTask", tasks, count);

  return { isLoading, users, error };
}
