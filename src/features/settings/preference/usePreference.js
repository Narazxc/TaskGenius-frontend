import { useQuery } from "@tanstack/react-query";
import { getMyPreference } from "../../../services/apiPreference";

export function usePreference() {
  const {
    isLoading,
    data: preference,
    error,
  } = useQuery({
    queryKey: ["preference"],
    queryFn: () => getMyPreference(),
  });

  return { isLoading, preference, error };
}
