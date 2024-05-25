import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser as updateCurrentUserApi } from "../../../services/apiUsers";

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCurrentUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (newUserData) => {
      console.log(newUserData);

      toast.success("User account successfully updated");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      //   console.log(newUserData);

      //   queryClient.setQueryData(["user"], newUserData);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCurrentUser };
}
