import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePreference as updatePreferenceApi } from "../../../services/apiPreference";

export function useUpdatePreference() {
  const queryClient = useQueryClient();

  const { mutate: updatePreference, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newPreferenceData, id }) =>
      updatePreferenceApi(newPreferenceData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preference"] });
      toast.success("Preference successfully updated", { duration: 1000 });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updatePreference };
}
