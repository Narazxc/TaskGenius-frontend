import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("User deleted successfully");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
